import cv2
import mediapipe as mp

mp_face_detection = mp.solutions.face_detection
mp_drawing = mp.solutions.drawing_utils

cap = cv2.VideoCapture(0)

with mp_face_detection.FaceDetection(model_selection=0, min_detection_confidence=0.5) as face_detection:
    while cap.isOpened():
        ret, frame = cap.read()
        if not ret:
            print("Failed to grab frame")
            break

        image = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        results = face_detection.process(image)

        if results.detections:
            for detection in results.detections:
                mp_drawing.draw_detection(frame, detection)

        cv2.imshow('Face Detection', frame)

        if cv2.waitKey(5) & 0xFF == 27:  # Press ESC to quit
            break

cap.release()
cv2.destroyAllWindows()


# Sblm selsai backlog pastiin dulu dari kalian sanggup ga slesain 
# bersedia comitment brp jam per hari , berarti per sprint bisa brp jam 
