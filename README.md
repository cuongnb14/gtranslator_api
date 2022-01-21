# Google Translate API

This api use puppeteer to control Chrome to get translate result from google translate website


# Run

```
docker run --name translator -p 3000:3000 cuongnb14/gtranslator:1.0
```

# Usage

```
curl http://localhost:3000/translate?from=en&to=vi&content=how%20are%20you
{"result":"bạn khỏe không"}
``` 