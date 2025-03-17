# Decorator chuyển đổi output thành chữ in hoa
def uppercase(func):
    # print current time
    import datetime
    print('uppercase')
    print(datetime.datetime.now())
    def wrapper(*args, **kwargs):
        result = func(*args, **kwargs)
        return result.upper()  # Chuyển output thành chữ in hoa
    return wrapper

# Decorator lặp lại việc gọi hàm n lần
def times(n):
    # print current time
    def decorator(func):
        import datetime
        print ('times')
        print(datetime.datetime.now())
        def wrapper(*args, **kwargs):
            results = [func(*args, **kwargs) for _ in range(n)]
            return "\n".join(results)  # Gộp các kết quả
        return wrapper
    return decorator

# Sử dụng hai decorators trên một hàm
@times(3)  # Lặp lại 3 lần
@uppercase  # Chuyển output thành in hoa
def greet(name):
    return f"Hello, {name}!"

# Thực thi hàm
print(greet("Alice"))
