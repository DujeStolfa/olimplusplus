from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import Select
import time

chrome_options = Options()
chrome_options.add_argument("--headless")
chrome_options.add_experimental_option('excludeSwitches', ['enable-logging'])
chrome_options.add_argument('--log-level=3')
driver = webdriver.Chrome(options=chrome_options)


# Ispravna prijava
def test1(email, password) -> bool:
    url = "http://localhost:3000/login"
    driver.get(url)
    driver.find_element(By.ID, "email").send_keys(email)
    driver.find_element(By.ID, "password").send_keys(password)
    driver.find_element(By.CSS_SELECTOR, "button[type='submit']").click()
    time.sleep(0.5)
    
    if driver.current_url.endswith("/login"):
        return False
    else:
        return True


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

# Uspješna promjena lozinke
def test3() -> bool:
    # Student login
    test1("ucenik@ucenik.com", "progi123")
    url = "http://localhost:3000/select-language/student"
    driver.get(url)
    # Open dropdown
    driver.find_element(By.XPATH, '//*[@id="root"]/nav/div/div/ul/li[1]/button').click() 
    # Go to change password
    driver.find_element(By.XPATH, '/html/body/div[2]/div[3]/ul/ul/div[2]/li[2]').click()
    driver.find_element(By.ID, "newPassword").send_keys("progi123")
    driver.find_element(By.ID, "confirmNewPassword").send_keys("progi123")
    driver.find_element(By.CSS_SELECTOR, "button[type='submit']").click()
    time.sleep(0.5)

    if driver.current_url.endswith("/edit-password"):
        return False
    else:
        return True

       
# Neispravno stvaranje admina    
def test4() -> bool:
    # Admin login
    test1("admin@admin.com", "progi123")
    url = "http://localhost:3000/select-language/admin"
    driver.get(url)
    # Select language
    driver.find_element(By.XPATH, '//*[@id="root"]/div/div/div/div/button').click() 
    # Admin-list
    driver.find_element(By.XPATH, '//*[@id="root"]/nav/div/div/ul/li[4]/div/a').click()
    # Go to add admin
    driver.find_element(By.XPATH, '//*[@id="root"]/div/div/div[1]/button').click()
    time.sleep(0.5) 
    driver.find_element(By.ID, "firstname").send_keys("Admin")
    driver.find_element(By.ID, "lastname").send_keys("Admin")
    driver.find_element(By.ID, "email").send_keys("admin123@admin.com")
    driver.find_element(By.ID, "password").send_keys("admin123")
    driver.find_element(By.ID, "confirmPassword").send_keys("progi123")
    driver.find_element(By.CSS_SELECTOR, "button[type='submit']").click()
    time.sleep(0.5) 

    if driver.current_url.endswith("/admin-list"):
        return True
    else:
        return False
    
# Neuspješno stvaranje rječnika
def test5():
    # Admin login
    test1("admin@admin.com", "progi123")
    url = "http://localhost:3000/select-language/admin"
    driver.get(url)
    time.sleep(0.5)
    # Select language
    driver.find_element(By.XPATH, '//*[@id="root"]/div/div/div/div/button').click() 
    # Dictionaries
    driver.find_element(By.XPATH, '//*[@id="root"]/nav/div/div/ul/li[3]/div/a').click() 
    dict_table = driver.find_element(By.XPATH, '//*[@id="root"]/div/div/div[2]/table/tbody')
    dict_table_before = dict_table.find_elements(By.CSS_SELECTOR, """#root > div > div 
                                                 > div.MuiPaper-root.MuiPaper-elevation
                                                 .MuiPaper-rounded.MuiPaper-elevation1
                                                 .sc-jSFipO.hkiwdC.css-1ps6pg7-MuiPaper-root 
                                                 > table > tbody > tr""")
    driver.find_element(By.XPATH, '//*[@id="root"]/div/div/div[1]/button').click()
    
    driver.find_element(By.CSS_SELECTOR, "button[type='submit']").click()
    time.sleep(0.5)
    dict_table_after = dict_table.find_elements(By.CSS_SELECTOR, """#root > div > div
                                                 > div.MuiPaper-root.MuiPaper-elevation
                                                .MuiPaper-rounded.MuiPaper-elevation1
                                                .sc-jSFipO.hkiwdC.css-1ps6pg7-MuiPaper-root
                                                 > table > tbody > tr""")

    if len(dict_table_before) != len(dict_table_after):
        return False
    else:
        return True



if test1("ucenik@ucenik.com", "progi123") == True:
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

driver.close()

