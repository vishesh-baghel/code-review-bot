# code-review-bot

# Install dependencies
npm install

# Run the bot
npm start
```
write something good
## Docker

```sh
# 1. Build container
docker build -t code-review-bot .

# 2. Start container
docker run -e APP_ID=<app-id> -e PRIVATE_KEY=<pem-value> code-review-bot
```

## Contributing

If you have suggestions for how code-review-bot could be improved, or want to report a bug, open an issue! We'd love all and any contributions.

For more, check out the [Contributing Guide](CONTRIBUTING.md).

## License

[ISC](LICENSE) © 2023 vishesh-baghel
