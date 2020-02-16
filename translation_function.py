from google.cloud import translate_v2 as translate

import os

from flask import Flask, render_template, redirect, url_for, request
from flask import make_response
app = Flask(__name__)

os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = "American Airlines-69ca66e234a0.json"
translate_client = translate.Client()


languages = [
'English',
'Spanish',
'German',
'Mandarin',
'Russian',
'Cantonese',
'French',
'Vietnamese'
]

target_list = [
'en',
'es',
'de',
'zh-CN',
'ru',
'zh-TW',
'fr',
'vi'
] 

main_list = [
'Need Help Getting to Your Destination?',
'Your fellow passengers can help',
'Choose A Translator',
"I'm A Translator",
"Frequent Flyer Number"]

booker_list = [
'English',
'Spanish',
'Book',
'German',
'Mandarin',
'Russian',
'Cantonese',
'French',
'Vietnamese',
"Thank you for booking! Please meet your translator upon arrival."]

translator_list = [
'Pick Up: ',
'Next Flight: ',
'Departure Time: ',
'Here is Your Travel Buddy: '
]

target_chosen = ""

@app.route('/', methods=['GET', 'POST'])
def get_language():
	if request.method == 'POST':
		target_chosen = request.form['data']
		print(target_chosen)
	return render_template('main.html')


def translate(input, target_chosen):
    result = translate_client.translate(input, target_language=target_chosen)
    return result['translatedText']

def translate_main(target_chosen):
    return [tf.translate(i, target_chosen) for i in main_list]

def translate_booker(target_chosen):
    return [tf.translate(i,target_chosen) for i in booker_list]

def translate_translator(target_chosen):
    return [tf.translate(i, target_chosen) for i in translator_list]

