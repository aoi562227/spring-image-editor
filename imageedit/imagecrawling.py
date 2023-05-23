#!/usr/bin/env python
# coding: utf-8

# In[1]:


from flask import Flask, request
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
import chromedriver_autoinstaller
import time
import urllib.request
import os
from bs4 import BeautifulSoup
from selenium.webdriver.common.by import By

app = Flask(__name__)


@app.route('/', methods=['GET'])
def index():
    return '''
        <style>
    .search-form {
        display: flex;
        align-items: center;
    }

    .search-input {
        padding: 10px;
        border: 1px solid #ccc;
        border-radius: 4px;
        margin-right: 5px;
    }

    .search-button {
        padding: 10px 20px;
        background-color: #4CAF50;
        color: #fff;
        border: none;
        border-radius: 4px;
        cursor: pointer;
    }
</style>

<form class="search-form" method="POST" action="/search">
    <input class="search-input" name="searchKey" placeholder="검색어를 입력하세요">
    <button class="search-button" type="submit">검색</button>
</form>
    '''


@app.route('/search', methods=['POST'])
def search():
    searchKey = request.form['searchKey']

    chromedriver_autoinstaller.install()
    driver = webdriver.Chrome()
    driver.get("https://www.google.co.kr/imghp?hl=ko&tab=wi&authuser=0&ogbl")
    elem = driver.find_element("name", "q")

    elem.send_keys(searchKey)
    elem.send_keys(Keys.RETURN)
    html = driver.page_source
    soup = BeautifulSoup(html, 'html.parser')

    imgs = driver.find_elements(By.CSS_SELECTOR, ".rg_i.Q4LuWd")
    dir = "C:/Users/" + os.getlogin() + "/Desktop/imgs" + "//" + searchKey
    try:
        if not os.path.exists(dir):
            os.makedirs(dir)
    except OSError:
        print("Error: Failed to create the directory.")

    count = 1
    for img in imgs:
        if count > 5:
            break
        try:
            img.click()
            time.sleep(1)
            imgUrl = driver.find_element(By.XPATH,
                                         f'//*[@id="islrg"]/div[1]/div[{count}]/a[1]/div[1]/img').get_attribute(
                "src")

            path = dir + "\\"
            urllib.request.urlretrieve(
                imgUrl, path + searchKey + str(count) + ".jpg")
            count = count + 1
            if count >= 260:
                break
        except Exception as e:
            print(e)
    driver.close()

    return "이미지 다운로드 완료"


if __name__ == '__main__':
    app.run(port=5000)


# In[ ]:
