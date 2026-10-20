from app import greet

def test_greet():
    assert greet() == "Hello from Jenkins CI!"

if __name__ == "__main__":
    test_greet()
    print("All tests passed!")