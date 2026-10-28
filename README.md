# AI SQL Assistant

**Electricity & Weather Data Analytics Platform** — ask a question in plain English, get back the SQL that answers it, the results, a chart, and a downloadable PDF report.

## Why

This started as a database assignment. The schema was there and the queries worked, but getting anything out of it meant writing SQL, which ruled out anyone who couldn't. So I rebuilt it as an application where the question is the interface, and the SQL is something you can check rather than something you have to write.

## What it does

Ask something like *"which region had the highest electricity demand on the coldest days?"* and the app will:

1. Send the question to an LLM along with the database schema, and get back a SQLite query
2. Run that query against the database
3. Return the rows as a table
4. Pick a chart type based on the shape of the result, and render it
5. Generate a written summary with key findings
6. Export the whole thing as a PDF report

**The generated SQL is always displayed.** Any answer the app gives you comes with the query that produced it, so you can see what actually ran instead of trusting a number.

## Stack

| Layer | Tech |
|---|---|
| Frontend | React 18, Vite, Recharts, axios, lucide-react |
| Backend | Python, FastAPI |
| Database | SQLite (star-schema style: `locations` and `dates` dimensions, four observation tables) |
| LLM | OpenAI `gpt-4.1-mini`, `temperature=0` |
| Reports | ReportLab |

## Data model

One row per location per date, split across four observation tables:

- `electricity_observations` — demand (GWh), price rank, high-price flag
- `temperature_observations` — mean / max / min
- `rainfall_observations` — precipitation, rain flag
- `wind_humidity_observations` — wind speed, humidity

All four join to `locations` on `location_id` and to `dates` on `date_id`. The schema is passed to the model in the system prompt, with explicit rules about which tables and columns exist, so it can't invent column names.

## Project structure

```
backend/
  app/
    main.py                  FastAPI routes: /query, /report, /locations
    crud.py                  SQL execution
    database.py              SQLite connection
    models.py                Pydantic request models
    prompts.py               System prompt — schema + generation rules
    services/
      ai_service.py          question -> SQL
      openai_service.py      results -> summary + chart recommendation
      report_service.py      PDF generation
  ml/                        data loading and preprocessing for the
                             earlier modelling work on the same dataset
frontend/
  src/
    components/              QueryInput, SQLViewer, ResultsTable,
                             ChartPanel, ChartInsight, AISummary, ...
    utils/chartUtils.js      column-name formatting and unit detection
    services/api.js          backend calls
notebooks/                   original analysis the dataset came from
database/                    the SQLite database
```

## Running locally

**Backend**

```bash
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload
```

Create `backend/.env`:

```
OPENAI_API_KEY=your_key_here
```

**Frontend**

```bash
cd frontend
npm install
npm run dev
```

The frontend runs on `http://localhost:5173`, which is the origin the backend's CORS config allows.

## What I'd do differently

**Restrict what SQL can run.** Right now `execute_sql` passes whatever the model returns straight to SQLite. The system prompt asks for read queries, but nothing enforces it — a prompt is a request, not a constraint. If I rebuilt this I'd parse the generated statement and reject anything that isn't a single `SELECT`, and open the database connection read-only. The model behaves in practice, but "it behaves in practice" isn't the same as "it can't do otherwise", and that gap is the part worth closing.

**Validate against the schema before executing.** Errors currently surface when SQLite rejects the query. Checking the generated SQL against the known table and column names first would let me catch the problem and retry before the user sees anything.

**Handle result shapes the chart code doesn't expect.** Chart selection works from the result columns, but a query returning a single aggregate value, or twenty columns, isn't something the current logic handles gracefully.

**Tests.** There aren't any. The piece I'd write first is the SQL guard above, because it's the one where "looks fine" and "is fine" are easiest to confuse.
