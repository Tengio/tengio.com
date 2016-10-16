package gocontacts

import (
    // "fmt"
    "google.golang.org/appengine"
    "google.golang.org/appengine/log"
    // "net/http"
    // "github.com/rickt/slack-appengine"
    // "bytes"
    "net/http"
    "net/url"
    "strings"
    "google.golang.org/appengine/urlfetch"
    "fmt"
    "io/ioutil"
)

func init() {
    http.HandleFunc("/gocontacts", handler)
}

func handler(w http.ResponseWriter, r *http.Request) {
  ctx := appengine.NewContext(r)
  client := urlfetch.Client(ctx)

  name = r.FormValue("name");
  email := r.FormValue("email");
  message := r.FormValue("message");
  s := []string{ "{\"username\": \"tengio-bot\", \"icon_emoji\":\":robot_face:\",\"text\":\"Hey guys!",
    " someone wants to get in contact with us, please follow up this is what he told me:\n Name: ",
    name, "\n Email: ", email, "\n Message: ",  message, "\n\"}" }
  payload := strings.Join(s, "")

  apiUrl := "https://hooks.slack.com/services/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"
  u, _ := url.ParseRequestURI(apiUrl)
  urlStr := fmt.Sprintf("%v", u)

  v := url.Values{}
  v.Set("payload", payload)
  _, _ = client.PostForm(urlStr, v)
}
