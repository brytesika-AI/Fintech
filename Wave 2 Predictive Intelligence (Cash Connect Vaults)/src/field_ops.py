"""
Autonomous Field Ops Ecosystem - Core Module
Manages agent dispatch, geotagged collections, and offline sync reconciliation.
"""

import hashlib
import time
from typing import Dict, List, Optional


class FieldAgent:
    def __init__(self, agent_id: str, name: str, location: Dict[str, float], float_balance: float = 0.0):
        self.agent_id = agent_id
        self.name = name
        self.location = location  # {"lat": float, "lng": float}
        self.float_balance = float_balance
        self.assigned_tasks: List[Dict] = []
        self.synced_transactions: List[Dict] = []

    def assign_task(self, customer_id: str, amount_due: float, address: str, geo_coords: Dict[str, float]):
        task = {
            "task_id": f"TASK-{int(time.time()*1000)}",
            "customer_id": customer_id,
            "amount_due": amount_due,
            "address": address,
            "target_coords": geo_coords,
            "status": "PENDING"
        }
        self.assigned_tasks.append(task)
        return task

    def record_collection(self, task_id: str, amount_collected: float, lat: float, lng: float) -> Dict:
        timestamp = time.time()
        signature_raw = f"{self.agent_id}:{task_id}:{amount_collected}:{lat}:{lng}:{timestamp}"
        geo_signature = hashlib.sha256(signature_raw.encode()).hexdigest()

        tx = {
            "transaction_id": f"TX-{int(timestamp)}",
            "task_id": task_id,
            "agent_id": self.agent_id,
            "amount": amount_collected,
            "timestamp": timestamp,
            "location": {"lat": lat, "lng": lng},
            "geo_signature": geo_signature,
            "status": "RECORDED_OFFLINE"
        }

        # Update task status
        for task in self.assigned_tasks:
            if task["task_id"] == task_id:
                task["status"] = "COMPLETED"

        self.float_balance += amount_collected
        self.synced_transactions.append(tx)
        return tx


class FieldOpsEngine:
    def __init__(self):
        self.agents: Dict[str, FieldAgent] = {}

    def register_agent(self, agent_id: str, name: str, lat: float, lng: float) -> FieldAgent:
        agent = FieldAgent(agent_id, name, {"lat": lat, "lng": lng})
        self.agents[agent_id] = agent
        return agent

    def reconcile_agent_float(self, agent_id: str) -> Dict:
        agent = self.agents.get(agent_id)
        if not agent:
            raise ValueError(f"Agent {agent_id} not found.")

        total_collected = sum(tx["amount"] for tx in agent.synced_transactions)
        return {
            "agent_id": agent_id,
            "agent_name": agent.name,
            "total_collected": total_collected,
            "current_float_balance": agent.float_balance,
            "completed_tasks": len([t for t in agent.assigned_tasks if t["status"] == "COMPLETED"]),
            "status": "RECONCILED"
        }


if __name__ == "__main__":
    engine = FieldOpsEngine()
    agent = engine.register_agent("AGT-001", "John Doe", -15.416667, 28.283333)
    task = agent.assign_task("CUST-9081", 450.0, "Plot 45 Cairo Rd, Lusaka", {"lat": -15.4170, "lng": 28.2840})
    tx = agent.record_collection(task["task_id"], 450.0, -15.4170, 28.2840)
    print("Collection Record:", tx)
    print("Reconciliation:", engine.reconcile_agent_float("AGT-001"))
