package capstone.imageedit.crawling;
import org.apache.commons.io.FileUtils;
import org.openqa.selenium.By;
import org.openqa.selenium.OutputType;
import org.openqa.selenium.TakesScreenshot;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.io.File;
import java.io.IOException;
import java.net.URL;
import java.util.List;

@Controller
@SpringBootApplication
public class ImageDownloader {

    private static final String DRIVER_PATH = "chromedriver.exe";
    private static final int MAX_IMAGE_COUNT = 5;
    private static final String IMAGE_DIR = "C:/Users/User/Desktop/imgs/";

    public static void main(String[] args) {
        SpringApplication.run(ImageDownloader.class, args);
    }

    @PostMapping("/search")
    @ResponseBody
    public String searchImages(@RequestParam String searchKey) throws IOException {
        // WebDriver 설정
        System.setProperty("webdriver.chrome.driver", DRIVER_PATH);
        ChromeOptions options = new ChromeOptions();
//        options.addArguments("--headless"); // Headless 모드로 실행
        WebDriver driver = new ChromeDriver(options);

        // 검색어로 구글 이미지 검색
        driver.get("https://www.google.co.kr/imghp?hl=ko&tab=wi&authuser=0&ogbl");
        WebElement searchBox = driver.findElement(By.name("q"));
        searchBox.sendKeys(searchKey);
        searchBox.submit();

        // 검색 결과에서 이미지 다운로드
        List<WebElement> images = driver.findElements(By.cssSelector(".rg_i.Q4LuWd"));
        int count = 0;
        for (WebElement image : images) {
            if (count >= MAX_IMAGE_COUNT) break;
            try {
                image.click();
                Thread.sleep(1000);
                String imageUrl = driver.findElement(By.cssSelector(".n3VNCb")).getAttribute("src");
                String imageFileName = searchKey + count + ".jpg";
                downloadImage(imageUrl, imageFileName);
                count++;
            } catch (Exception e) {
                System.out.println(e.getMessage());
            }
        }

        // WebDriver 종료
        driver.quit();

        return "이미지 다운로드 완료";
    }

    private void downloadImage(String imageUrl, String fileName) throws IOException {
        File imageDir = new File(IMAGE_DIR);
        if (!imageDir.exists()) {
            imageDir.mkdirs();
        }

        URL url = new URL(imageUrl);
        File file = new File(IMAGE_DIR + fileName);
        FileUtils.copyURLToFile(url, file);
    }
}