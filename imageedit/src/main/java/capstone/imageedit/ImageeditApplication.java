package capstone.imageedit;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;

@EnableFeignClients
@SpringBootApplication
public class ImageeditApplication {

	public static void main(String[] args) {
		SpringApplication.run(ImageeditApplication.class, args);
	}

}
