package gocontacts

import (
    "google.golang.org/appengine"
    "net/http"
    "net/url"
    "google.golang.org/appengine/urlfetch"
    "fmt"
    "strings"
)

func init() {
    http.HandleFunc("/gocontacts", handler)
}

func handler(w http.ResponseWriter, r *http.Request) {
  ctx := appengine.NewContext(r)
  client := urlfetch.Client(ctx)

  name := r.FormValue("name");
  email := r.FormValue("email");
  message := r.FormValue("message");
  s := []string{ "{\"username\": \"tengio-bot\",",
    "\"icon_emoji\":\":robot_face:\",",
    "\"text\":\"Hey guys! Someone wants to get in touch with us, this is what he told me:\n Name: ",
    name, "\n Email: ", email, "\n Message: ",  message, "\n\"}" }
  payload := strings.Join(s, "")

  u, _ := url.ParseRequestURI("{{slack-integration-url}}")
  urlStr := fmt.Sprintf("%v", u)

  v := url.Values{}
  v.Set("payload", payload)
  _, _ = client.PostForm(urlStr, v)
}
