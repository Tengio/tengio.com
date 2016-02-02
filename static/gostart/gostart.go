package gostart

import (
    "fmt"
    "net/http"
)

func init() {
    http.HandleFunc("/gostart", handler)
}

func handler(w http.ResponseWriter, r *http.Request) {
    fmt.Fprint(w, "Hello, world!")
}
