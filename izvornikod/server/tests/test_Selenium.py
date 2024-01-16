from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
import time

chrome_options = Options()
chrome_options.add_argument("--headless")
chrome_options.add_experimental_option('excludeSwitches', ['enable-logging'])
chrome_options.add_argument('--log-level=3')
driver = webdriver.Chrome(options=chrome_options)

# Neispravan login
def test1() -> bool:
    url = "http://localhost:3000/login"
    driver.get(url)
    driver.find_element(By.ID, "email").send_keys("osoba@osoba.com")
    driver.find_element(By.ID, "password").send_keys("123456")
    driver.find_element(By.CSS_SELECTOR, "button[type='submit']").click()
    
    if driver.current_url.endswith("/login"):
        return True
    else:
        return False

# Neispravna registracija
def test2() -> bool:
    url = "http://localhost:3000/login"
    driver.get(url)
    driver.find_element(By.CSS_SELECTOR, "button[type='button']").click()
    driver.find_element(By.ID, "firstname").send_keys("Osoba")
    driver.find_element(By.ID, "lastname").send_keys("Osoba")
    driver.find_element(By.ID, "email").send_keys("osoba.com")
    driver.find_element(By.CSS_SELECTOR, "button[type='submit']").click()

    if driver.current_url.endswith("/register"):
        return True
    else:
        return False

# Ispravna registracija
def test3() -> bool:
    url = "http://localhost:3000/login"
    driver.get(url)
    driver.find_element(By.CSS_SELECTOR, "button[type='button']").click()
    driver.find_element(By.ID, "firstname").send_keys("Osoba")
    driver.find_element(By.ID, "lastname").send_keys("Osoba")
    driver.find_element(By.ID, "email").send_keys("osoba@osoba.com")
    driver.find_element(By.CSS_SELECTOR, "button[type='submit']").click()

    if driver.current_url.endswith("/register"):
        return False
    else:
        return True

# Prijava postojećeg korisničkog računa s nepostojećom lozinkom
def test4() -> bool:
    url = "http://localhost:3000/login"
    driver.get(url)
    driver.find_element(By.ID, "email").send_keys("admin@admin.com")
    driver.find_element(By.ID, "password").send_keys("123456")
    driver.find_element(By.CSS_SELECTOR, "button[type='submit']").click()
    
    if driver.current_url.endswith("/login"):
        return True
    else:
        return False

# Ispravna prijava
def test5() -> bool:
    url = "http://localhost:3000/login"
    driver.get(url)
    driver.find_element(By.ID, "email").send_keys("admin@admin.com")
    driver.find_element(By.ID, "password").send_keys("progi123")
    driver.find_element(By.CSS_SELECTOR, "button[type='submit']").click()
    time.sleep(0.5)
    
    if driver.current_url.endswith("/login"):
        return False
    else:
        return True

if test1() == True:
    print("Test 1 - USPJEH!")
else:
    print("Test 1 - NEUSPJEH!")
if test2() == True:
    print("Test 2 - USPJEH!")
else:
    print("Test 2 - NEUSPJEH!")
if test3() == True:
    print("Test 3 - USPJEH!")
else:
    print("Test 3 - NEUSPJEH!")
if test4() == True:
    print("Test 4 - USPJEH!")
else:
    print("Test 4 - NEUSPJEH!")
if test5() == True:
    print("Test 5 - USPJEH!")
else:
    print("Test 5 - NEUSPJEH!")

