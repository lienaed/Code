#include <iostream>
#include <string>
#include <map>
#include <sstream>
#include <curl/curl.h>

size_t WriteCallback(void* contents, size_t size, size_t nmemb, std::string* output) {
    output->append((char*)contents, size * nmemb);
    return size * nmemb;
}

int main() {
    CURL* curl = curl_easy_init();
    std::string html;
    if(curl) {
        curl_easy_setopt(curl, CURLOPT_URL, "https://example.com");
        curl_easy_setopt(curl, CURLOPT_WRITEFUNCTION, WriteCallback);
        curl_easy_setopt(curl, CURLOPT_WRITEDATA, &html);
        curl_easy_perform(curl);
        curl_easy_cleanup(curl);
    }

    std::map<std::string, int> freq;
    std::istringstream iss(html);
    std::string word;
    while (iss >> word) freq[word]++;

    std::string max_word;
    int max_count = 0;
    for (auto& [w, c] : freq)
        if (c > max_count) max_word = w, max_count = c;

    std::cout << max_word << ": " << max_count << "\n";
}
