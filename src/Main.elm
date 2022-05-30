port module Main exposing (..)

import Browser
import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (..)
import Http
import Json.Decode as Decode exposing (Decoder, field, int, string)
import Json.Encode as Encode
import String



-- MAIN


main : Program () Model Msg
main =
  Browser.element
    { init = init
    , update = update
    , subscriptions = subscriptions
    , view = view
    }


port send : Response -> Cmd msg
port recv : (String -> msg) -> Sub msg



-- MODEL


type alias Model = {}


type alias Request =
  { callback: Decode.Value }


type alias Response =
  { body: String
  , callback: Encode.Value
  }



-- Decoders 


requestDecoder : Decoder Request
requestDecoder =
  Decode.map Request (Decode.at ["detail", "callback"] Decode.value)


onAppRequest : (Request -> msg) -> Attribute msg
onAppRequest msg =
  on "app-request" (Decode.map msg requestDecoder)



-- Init


init : () -> (Model, Cmd Msg)
init _ =
  ({}, Cmd.none)



-- UPDATE


type Msg
  = Receive Request


update : Msg -> Model -> (Model, Cmd Msg)
update msg model =
  case msg of
    Receive request ->
      (model, send { body = "Hello Elm!", callback = request.callback })



-- SUBSCRIPTIONS


subscriptions : Model -> Sub Msg
subscriptions model =
  Sub.none



-- VIEW


view : Model -> Html Msg
view model =
  app [ onAppRequest Receive ] []


app : List (Attribute msg) -> List (Html msg) -> Html msg
app attrs children =
  node "x-app" attrs children
