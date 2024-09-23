# F1 Race Results

This project is a web application that displays F1 race results. It fetches data from the Ergast API and presents it in a clean, modern UI inspired by Apple's design principles. The application includes features like a year and race selector, a ripple effect on header hover, and developer credits with an animation.

## Features

- Select a year and race to view results.
- Ripple effect on header hover.
- Developer credits with animation.
- Responsive design for various screen sizes.

## Technologies Used

- HTML
- CSS
- JavaScript
- Flask (Python)
- Ergast API




## Setup Instructions

1. **Clone the repository**:
    ```sh
    git clone https://github.com/utkarshkr13/f1-race-results.git
    cd f1-race-results
    ```

2. **Create a virtual environment**:
    ```sh
    python -m venv venv
    source venv/bin/activate  # On Windows, use `venv\Scripts\activate`
    ```

3. **Install dependencies**:
    ```sh
    pip install flask requests
    ```

4. **Run the Flask application**:
    ```sh
    python app.py
    ```

5. **Open your browser and navigate to**:
    ```
    http://127.0.0.1:5000/
    ```

## File Descriptions

- **index.html**: The main HTML file that contains the structure of the web page.
- **style.css**: The CSS file that styles the web page, including the ripple effect and developer credits animation.
- **script.js**: The JavaScript file that handles the dynamic population of the year and race selectors, and the ripple effect on header hover.
- **webgl-background.js**: A JavaScript file for rendering the WebGL background (if applicable).
- **app.py**: The main Flask application file that serves the HTML template.


## Developer Credits

Developed by [Utkarsh Rajput](https://github.com/utkarshkr13).

## License

This project is licensed under the MIT License.
