class User:
    password: str
    email: str
    
    def __init__(self, email: str, password: str):
        self.password = password
        self.email = email
        
    def __str__(self):
        return f"User(_id={self._id}, email={self.email}, password={self.password})"