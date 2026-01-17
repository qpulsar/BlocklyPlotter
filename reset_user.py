import os
import django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'BlocklyPlotter.settings')
django.setup()

from django.contrib.auth import get_user_model
User = get_user_model()
email = 'admin@admin.com'
password = 'jdhHm-m-bV$G4!'

try:
    # Try finding by email
    try:
        u = User.objects.get(email=email)
        print(f"User found by email: {u.email}")
    except User.DoesNotExist:
        # Try finding by username (if email is used as username)
        try:
            u = User.objects.get(username=email)
            print(f"User found by username: {u.email}")
        except User.DoesNotExist:
            print("User not found.")
            u = None

    if u:
        u.set_password(password)
        u.save()
        print(f"Password reset for {email}")
    else:
        # Create user
        # Check if username field is needed
        print("Creating user...")
        # Assuming CustomUser might use email as username or has no username field
        # We will inspect the model in view_file, but for now let's try standard create_user
        # If it fails, we will see the error.
        try:
           u = User.objects.create_user(username=email, email=email, password=password)
           print("User created with username=email")
        except Exception as e:
           print(f"Error creating user: {e}")
           # Try without username if it's a custom user model without username
           try:
               u = User.objects.create_user(email=email, password=password)
               print("User created without username")
           except Exception as e2:
               print(f"Error creating user w/o username: {e2}")

except Exception as e:
    print(f"Global Error: {e}")
