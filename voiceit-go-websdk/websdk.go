package websdk

import (
	"net/http"

	voiceit2 "github.com/voiceittech/VoiceIt2-Go/v2"
)

const (
	platformVersion = "0.0.1"
)

type BaseUrls struct {
	API2           string
	LivenessServer string
}

type Backend struct {
	vi                   voiceit2.VoiceIt2
	livenessServerClient LivenessServerClient
}

func (backend *Backend) Initialize(apiKey, apiToken string, sessionExpirationTimeHours int, baseUrls ...BaseUrls) {

	var api2BaseUrl, livenessServerBaseUrl string

	if len(baseUrls) < 1 { // baseUrls optional parameter not passed
		api2BaseUrl, livenessServerBaseUrl = "https://api.voiceit.io", "https://liveness.voiceit.io"
	} else {
		if baseUrls[0].API2 != "" {
			api2BaseUrl = baseUrls[0].API2
		} else {
			api2BaseUrl = "https://api.voiceit.io"
		}

		if baseUrls[0].LivenessServer != "" {
			livenessServerBaseUrl = baseUrls[0].LivenessServer
		} else {
			livenessServerBaseUrl = "https://liveness.voiceit.io"
		}
	}

	backend.vi = voiceit2.VoiceIt2{
		APIKey:   apiKey,
		APIToken: apiToken,
		BaseUrl:  api2BaseUrl,
	}

	backend.livenessServerClient = LivenessServerClient{
		APIKey:   apiKey,
		APIToken: apiToken,
		BaseUrl:  livenessServerBaseUrl,
	}
}

func (backend Backend) MakeCall(w http.ResponseWriter, r *http.Request) {
}
