package gocontacts

import (
    // "fmt"
    "google.golang.org/appengine"
    "net/http"
    "github.com/rickt/slack-appengine"
    "strings"
)

const (
  token       = "xoxp-4606477437-4584636048-90913100039-91429ab91d745884779e4fc5229b0293"
  channelName = "website-contacts"
)

func init() {
    http.HandleFunc("/gocontacts", handler)
}

func handler(w http.ResponseWriter, r *http.Request) {
  ctx := appengine.NewContext(r)
  api := slack.New(token, ctx)
  channel, err := api.FindChannelByName(channelName)
  if err != nil {
    panic(err)
  }
  name := r.FormValue("name");
  email := r.FormValue("email");
  message := r.FormValue("message");
  s := []string{ name, email, message }
  err = api.ChatPostMessage(channel.Id, strings.Join(s, " "), nil)
  if err != nil {
    panic(err)
  }
}
