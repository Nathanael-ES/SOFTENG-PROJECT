import cv2
import dlib
import numpy as np
from scipy.spatial import distance

# Load the pre-trained face and landmark detector from dlib
detector = dlib.get_frontal_face_detector()
predictor = dlib.shape_predictor('shape_predictor_68_face_landmarks.dat')

# Define the indices of the 6 points that define the eye region in the 68 landmark points
# These points correspond to the left and right eyes in the landmark model
# Left eye: points 36-41
# Right eye: points 42-47
LEFT_EYE_POINTS = list(range(36, 42))
RIGHT_EYE_POINTS = list(range(42, 48))

# Calculate the Eye Aspect Ratio (EAR)
def eye_aspect_ratio(eye):
    # Compute the euclidean distances between two sets of vertical eye landmarks
    A = distance.euclidean(eye[1], eye[5])
    B = distance.euclidean(eye[2], eye[4])
    # Compute the euclidean distance between the horizontal eye landmarks
    C = distance.euclidean(eye[0], eye[3])
    # Compute the EAR
    ear = (A + B) / (2.0 * C)
    return ear

# OpenCV video capture
cap = cv2.VideoCapture(0)  # Change to video path if testing with video file

# Thresholds for detecting drowsiness
EAR_THRESHOLD = 0.25  # Threshold for detecting eye closure
EAR_CONSEC_FRAMES = 48  # Number of consecutive frames for the eyes being closed to trigger drowsiness

# Initialize variables
counter = 0
drowsy = False

while True:
    ret, frame = cap.read()
    if not ret:
        break
    
    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
    faces = detector(gray)

    for face in faces:
        # Get the facial landmarks
        landmarks = predictor(gray, face)
        
        # Get the coordinates of the left and right eyes
        left_eye = np.array([(landmarks.part(i).x, landmarks.part(i).y) for i in LEFT_EYE_POINTS])
        right_eye = np.array([(landmarks.part(i).x, landmarks.part(i).y) for i in RIGHT_EYE_POINTS])

        # Calculate the EAR for both eyes
        left_ear = eye_aspect_ratio(left_eye)
        right_ear = eye_aspect_ratio(right_eye)

        # Average the EAR values for both eyes
        ear = (left_ear + right_ear) / 2.0

        # Draw the eyes
        cv2.polylines(frame, [left_eye], isClosed=True, color=(0, 255, 0), thickness=1)
        cv2.polylines(frame, [right_eye], isClosed=True, color=(0, 255, 0), thickness=1)

        # Check if the EAR is below the threshold (eyes closed)
        if ear < EAR_THRESHOLD:
            counter += 1  # Eyes are closed for this frame
        else:
            counter = 0  # Reset the counter if the eyes are open

        # If eyes are closed for enough consecutive frames, trigger "Drowsy"
        if counter >= EAR_CONSEC_FRAMES:
            if not drowsy:
                drowsy = True
                print("Drowsy detected!")
            cv2.putText(frame, "DROWSY", (10, 30), cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 0, 255), 2)
        else:
            drowsy = False

    # Display the resulting frame
    cv2.imshow('Eye Detection', frame)

    # Press 'q' to exit
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

# Release the video capture object and close the windows
cap.release()
cv2.destroyAllWindows()
