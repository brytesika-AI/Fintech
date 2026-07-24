"""
The Proactive Credit Co-Pilot - Core Intelligence Engine
Evaluates borrower metrics, computes real-time credit score, and generates proactive recommendations.
"""

from typing import Dict, List, Optional


class CreditCoPilot:
    def __init__(self):
        self.risk_thresholds = {
            "low": 750,
            "medium": 650,
            "high": 550
        }

    def calculate_credit_score(
        self,
        monthly_income: float,
        monthly_expenses: float,
        existing_debt: float,
        repayment_history_pct: float,
        days_past_due: int
    ) -> Dict:
        """
        Computes a dynamic credit score (300-850 range) based on cash flow and behavioral metrics.
        """
        net_cash_flow = monthly_income - monthly_expenses
        debt_to_income = (existing_debt / monthly_income) if monthly_income > 0 else 1.0

        # Base score calculation
        score = 650.0

        # Cash flow stability factor (+50 to -100)
        if net_cash_flow > 0.3 * monthly_income:
            score += 50
        elif net_cash_flow < 0:
            score -= 80

        # Repayment history impact (+100 to -150)
        score += (repayment_history_pct - 0.8) * 250

        # Days past due penalty
        score -= min(days_past_due * 10, 200)

        # Debt to income adjustment
        if debt_to_income > 0.5:
            score -= 50

        score = max(300, min(850, int(score)))

        # Risk level determination
        if score >= self.risk_thresholds["low"]:
            risk_tier = "LOW_RISK"
            recommended_action = "ELIGIBLE_FOR_LIMIT_INCREASE"
            suggested_credit_limit = round(monthly_income * 1.5, 2)
        elif score >= self.risk_thresholds["medium"]:
            risk_tier = "MODERATE_RISK"
            recommended_action = "MAINTAIN_CURRENT_LIMIT"
            suggested_credit_limit = round(monthly_income * 0.75, 2)
        else:
            risk_tier = "HIGH_RISK"
            recommended_action = "TRIGGER_PROACTIVE_DEBT_RESTRUCTURING"
            suggested_credit_limit = round(monthly_income * 0.25, 2)

        return {
            "credit_score": score,
            "risk_tier": risk_tier,
            "net_cash_flow": round(net_cash_flow, 2),
            "debt_to_income_ratio": round(debt_to_income, 2),
            "recommended_action": recommended_action,
            "suggested_credit_limit": suggested_credit_limit,
            "proactive_insights": self._generate_insights(score, days_past_due, debt_to_income)
        }

    def _generate_insights(self, score: int, days_past_due: int, dti: float) -> List[str]:
        insights = []
        if days_past_due > 0:
            insights.append(f"Account has {days_past_due} days past due. Immediate outreach recommended.")
        if dti > 0.4:
            insights.append(f"High Debt-to-Income ratio ({dti*100:.1f}%). Suggest debt consolidation plan.")
        if score >= 750:
            insights.append("Excellent credit profile. Recommend pre-approved expansion offer.")
        elif score < 600:
            insights.append("Borrower shows financial strain. Proactive payment delay deferral offered.")
        return insights


if __name__ == "__main__":
    copilot = CreditCoPilot()
    res = copilot.calculate_credit_score(
        monthly_income=5000.0,
        monthly_expenses=3200.0,
        existing_debt=1200.0,
        repayment_history_pct=0.95,
        days_past_due=0
    )
    print("Credit Assessment:", res)
