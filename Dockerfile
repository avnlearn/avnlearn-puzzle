# Use the official Python image from the Docker Hub
FROM python:3.8-slim

# Set the working directory in the container
WORKDIR /app

# Copy the pyproject.toml file into the container
COPY pyproject.toml .

# Install flit
RUN pip install flit

# Install the dependencies
RUN flit install --deps production

# Copy the rest of the application code into the container
COPY app.py .

# Expose the port the app runs on
EXPOSE 8080

# Command to run the application
CMD ["python", "app.py"]
