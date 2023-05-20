package capstone.imageedit.chatgpt.restcontroller;

import capstone.imageedit.chatgpt.model.request.ChatRequest;
import capstone.imageedit.chatgpt.model.request.TranscriptionRequest;
import capstone.imageedit.chatgpt.model.response.ChatGPTResponse;
import capstone.imageedit.chatgpt.model.response.WhisperTranscriptionResponse;
import capstone.imageedit.chatgpt.service.OpenAIClientService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/api/v1")
public class OpenAIClientController {

    private final OpenAIClientService openAIClientService;

    @PostMapping(value = "/chat", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ChatGPTResponse chat(@RequestBody ChatRequest chatRequest){
        return openAIClientService.chat(chatRequest);
    }

    @PostMapping(value = "/transcription", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public WhisperTranscriptionResponse createTranscription(@ModelAttribute TranscriptionRequest transcriptionRequest){
        return openAIClientService.createTranscription(transcriptionRequest);
    }
}
