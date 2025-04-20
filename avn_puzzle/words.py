import random

def sample_words_from_file(file_path, num_samples=8, buffer_size=1024*1024):
    # Initialize a reservoir for the samples
    reservoir = []
    
    with open(file_path, 'r', encoding='utf-8') as file:
        buffer = ''
        while True:
            # Read a chunk of data
            chunk = file.read(buffer_size)
            if not chunk:
                break  # End of file
            
            # Split the chunk into lines
            lines = (buffer + chunk).splitlines()
            buffer = lines.pop()  # Keep the last line in case it's incomplete
            
            for i, word in enumerate(lines):
                if i + len(reservoir) < num_samples:
                    # Fill the reservoir initially
                    reservoir.append(word)
                else:
                    # Randomly replace elements in the reservoir with decreasing probability
                    j = random.randint(0, i + len(reservoir))
                    if j < num_samples:
                        reservoir[j] = word

    # Handle any remaining buffer lines
    if buffer:
        if len(reservoir) < num_samples:
            reservoir.append(buffer)
        else:
            j = random.randint(0, len(reservoir))
            if j < num_samples:
                reservoir[j] = buffer

    return reservoir

if __name__ == "__main__":
    # Example usage
    file_path = 'path/to/your/wordlist.txt'  # Replace with your actual file path
    random_words = sample_words_from_file(file_path)
    print(random_words)
