import unittest
from fastapi.testclient import TestClient
from handicap import app  # Replace 'app' with the actual name of your FastAPI instance

class TestCalculateResult(unittest.TestCase):
    def setUp(self):
        self.client = TestClient(app)

    def test_calculate_result(self):
        input_data = {
            "BallsFor": 80,
            "BallsAgainst": 45,
            "Wins": 8,
            "Games": 8
        }

        response = self.client.post("/calcHandicap", json=input_data)

        self.assertEqual(response.status_code, 200)
        result = response.json()

        # Modify the expected_result based on your calculation logic
        expected_result = ((input_data["BallsFor"] / (input_data["BallsFor"] + input_data["BallsAgainst"])) * 10) + ((input_data["Wins"] / input_data["Games"]) * 5)

        self.assertIn("result", result)
        self.assertEqual(result["result"], expected_result)

if __name__ == '__main__':
    unittest.main()