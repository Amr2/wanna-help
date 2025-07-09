FROM golang:1.21-alpine
WORKDIR /app
COPY . .
RUN go install github.com/cosmtrek/air@latest
CMD ["air"]
