package capstone.imageedit.crawling;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;

@Controller
public class PythonController {

    @PostMapping("/runPython")
    @ResponseBody
    public String runPythonCode(@RequestBody String pythonCode) {
        try {
            // Python 프로세스 실행
            ProcessBuilder processBuilder = new ProcessBuilder("python", "-c", pythonCode);
            Process process = processBuilder.start();

            // 프로세스 결과 읽기
            BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()));
            StringBuilder output = new StringBuilder();
            String line;
            while ((line = reader.readLine()) != null) {
                output.append(line).append("\n");
            }

            // 프로세스 종료 대기
            int exitCode = process.waitFor();
            if (exitCode == 0) {
                return output.toString();
            } else {
                // 프로세스 실행 중 오류가 발생한 경우
                return "Error occurred during Python execution";
            }
        } catch (IOException | InterruptedException e) {
            e.printStackTrace();
            return "Error occurred during Python execution";
        }
    }
}
