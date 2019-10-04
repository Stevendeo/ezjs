open Js_of_ocaml
open Js
open Browser_utils
open Promise

class type language_percent = object
  method language : js_string t prop
  method percentage : int prop
end

class type language_detection = object
  method isReliable : bool t prop
  method languages : language_percent t js_array t prop
end

class type i18n = object
  method getAcceptLanguages : js_string t js_array t promise t meth
  method getMessage : js_string t -> js_string t js_array t optdef -> js_string t meth
  method getUILanguage : js_string t meth
  method detectLanguage : js_string t -> language_detection promise t meth
end

let i18n = Unsafe.variable "browser.i18n"

let getAcceptLanguages f = to_lwt i18n##getAcceptLanguages() >>= f
let getMessage ?substitutions message =
  to_string i18n##getMessage(string message, optdef array_of_list_str substitutions)
let getUILanguage () = i18n##getUILanguage()
let detectLanguage text = i18n##detectLanguage(string text)
