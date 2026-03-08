from collections import Counter
import re

def find_most_common_word_by_category(data):
    """
    Finds the most frequent word in each category's summary.
    If there is a tie, any of the top words can be returned.
    """
    most_common_words = {}
    
    for category, details in data.items():
        summary = details.get('summary', '')
        # Basic tokenization: extract words (alphanumeric), lowercase them
        words = re.findall(r'\b\w+\b', summary.lower())
        
        # If no words found (e.g., empty summary), set to None
        if not words:
            most_common_words[category] = None
            continue
            
        counts = Counter(words)
        # most_common(1) returns list of (word, count) tuples
        most_common_word, count = counts.most_common(1)[0]
        most_common_words[category] = most_common_word
        
    return most_common_words

# --- Test Cases ---

def test_logic():
    test_data = {
        "Clothing": {
            "summary": "This category includes dresses, T-shirts, and jeans. The dresses are very popular among women."
        },
        "Electronics": {
            "summary": "High-tech smartphones and laptops feature latest technology. Laptops are essential for work."
        },
        "Home Decor": {
          "summary": "" # Edge case: empty summary
        },
        "Furniture": {
          "summary": "Large sofas and comfortable chairs. Large tables are also available."
        }
    }
    
    expected_results = {
        "Clothing": "dresses",
        "Electronics": "laptops", 
        "Home Decor": None,
        "Furniture": "large" # 'large' appears twice
    }
    
    results = find_most_common_word_by_category(test_data)
    
    print("Test Results:")
    for category, word in results.items():
        print(f"Category: {category} -> Most Common Word: {word}")
        assert word == expected_results[category], f"Assertion failed for {category}: expected {expected_results[category]}, got {word}"

    print("\nAll tests passed successfully!")

if __name__ == "__main__":
    test_logic()
