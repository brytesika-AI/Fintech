"""
The Proactive Credit Co-Pilot - REST API Endpoint
FastAPI server exposing credit decisioning APIs.
"""

from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import Optional
from credit_copilot import CreditCoPilot

app = FastAPI(
    title="The Proactive Credit Co-Pilot API",
    description="AI-driven credit assessment and proactive risk mitigation service",
    version="1.0.0"
)

copilot = CreditCoPilot()


class CreditAssessmentRequest(BaseModel):
    customer_id: str
    monthly_income: float
    monthly_expenses: float
    existing_debt: float
    repayment_history_pct: float = 1.0
    days_past_due: int = 0


@app.get("/")
def health_check():
    return {"service": "Proactive Credit Co-Pilot", "status": "active"}


@app.post("/api/v1/assess-credit")
def assess_credit(req: CreditAssessmentRequest):
    if req.monthly_income < 0 or req.monthly_expenses < 0:
        raise HTTPException(status_code=400, detail="Income and expenses must be non-negative.")

    result = copilot.calculate_credit_score(
        monthly_income=req.monthly_income,
        monthly_expenses=req.monthly_expenses,
        existing_debt=req.existing_debt,
        repayment_history_pct=req.repayment_history_pct,
        days_past_due=req.days_past_due
    )
    result["customer_id"] = req.customer_id
    return result


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("api:app", host="0.0.0.0", port=8000, reload=True)
