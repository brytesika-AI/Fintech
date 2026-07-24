"""
Zero-Touch Onboarding & Decisioning Engine
Handles automated KYC verification, AML checks, and instant account provisioning.
"""

import random
import time
from typing import Dict, List, Optional


class ZeroTouchPipeline:
    def __init__(self):
        self.sanctioned_names = ["JOHN BADMAN", "EVIL CORP", "MALICIOUS ENTITY"]

    def process_application(self, applicant_data: Dict) -> Dict:
        """
        Executes end-to-end Zero-Touch Onboarding pipeline.
        """
        app_id = f"APP-{int(time.time()*1000)}"
        full_name = f"{applicant_data.get('first_name', '')} {applicant_data.get('last_name', '')}".strip().upper()
        national_id = applicant_data.get("national_id")
        dob = applicant_data.get("dob")

        # Step 1: Document OCR & Validation
        ocr_valid = self._validate_id_document(national_id)

        # Step 2: AML & Sanctions Screening
        aml_passed = full_name not in self.sanctioned_names

        # Step 3: Facial Liveness Check Simulation
        liveness_score = round(random.uniform(0.85, 0.99), 2)

        # Decision Logic
        if not ocr_valid:
            status = "REJECTED"
            reason = "Invalid National ID Format"
            account_number = None
        elif not aml_passed:
            status = "FLAGGED_COMPLIANCE_REVIEW"
            reason = "AML/Sanctions Match Detected"
            account_number = None
        elif liveness_score < 0.8:
            status = "MANUAL_VERIFICATION_REQUIRED"
            reason = "Liveness confidence score below threshold"
            account_number = None
        else:
            status = "AUTO_APPROVED"
            reason = "Zero-Touch Onboarding Successful"
            account_number = f"ACC-{random.randint(1000000000, 9999999999)}"

        return {
            "application_id": app_id,
            "applicant": full_name,
            "national_id": national_id,
            "status": status,
            "decision_reason": reason,
            "account_number": account_number,
            "verifications": {
                "ocr_valid": ocr_valid,
                "aml_cleared": aml_passed,
                "liveness_confidence": liveness_score
            },
            "timestamp": time.time()
        }

    def _validate_id_document(self, national_id: str) -> bool:
        if not national_id or len(national_id) < 5:
            return False
        return True


if __name__ == "__main__":
    pipeline = ZeroTouchPipeline()
    applicant = {
        "first_name": "Jane",
        "last_name": "Smith",
        "national_id": "ZM-987654321",
        "dob": "1994-06-15"
    }
    result = pipeline.process_application(applicant)
    print("Zero-Touch Result:", result)
