def binary_search(arr, target):
    left, right = 0, len(arr) - 1
    count = 0  # To count the number of iterations

    while left <= right:
        count += 1  # Increment count for each iteration
        mid = left + (right - left) // 2

        if arr[mid] == target:
            return count  # Return the number of iterations
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1

    return count  # If not found, return count (for completeness)

# Create a sorted array from 1 to 100
sorted_array = list(range(1, 101))

# Calculate the number of iterations required for each number from 1 to 100
iterations_required = {}
for number in sorted_array:
    iterations_required[number] = binary_search(sorted_array, number)

# Print the results
for number, iterations in iterations_required.items():
    print(f"{iterations}")
