const puppeteer = require('puppeteer');
let browser;
let page;
let url = "https://school.moodledemo.net/reportbuilder/index.php";

function delay(ms) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("done")
    }, ms)
  })
}

async function login() {
  page.goto("https://school.moodledemo.net/login/index.php");
  const username = "#username";
  const password = "#password";
  const btn = "#loginbtn";
  await page.waitForSelector(username);
  await page.type(username, "henryross234");
  await page.type(password, "moodle");
  await page.click(btn);
  await page.waitForTimeout(1000);
}

beforeAll(async () => {
  browser = await puppeteer.launch({ headless: false });
  page = await browser.newPage();
  await login();
  await page.goto(url, { timeout: 100000 });
}, 100000);

afterAll(async () => {
  await browser.close();
});

describe('Create New Report Automation Test', () => {
  const newreport = '[data-action="report-create"]';
  const name = '.form-control ';
  const reportsource = '.custom-select';
  const save = '[data-action="save"]';

  const id_error_name = '.form-control-feedback';

  test('Normal flow', async () => {
    await page.click(newreport);
    await page.type(name, "a");
    await page.select(reportsource, "Blogs");
    await page.click(save);

    await delay(1000);
  }, 100000);

  test('Non type name', async () => {
    await page.click(newreport);
    await page.type(name, "");
    await page.select(reportsource, "Blogs");
    await page.click(save);
    const error = await page.waitForSelector(id_error_name);
    expect(error).toBe(error);
    await delay(1000);
  }, 100000);

  test('Non select source', async () => {
    await page.click(newreport);
    await page.type(name, "a");
    await page.select(reportsource, "");
    await page.click(save);
    const error = await page.waitForSelector(id_error_name);
    expect(error).toBe(error);

    await delay(1000);
  }, 100000);

  // Add more test cases as needed
});
