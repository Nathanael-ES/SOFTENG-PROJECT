import cv2
import numpy as np
import os
import mediapipe as mp
from collections import deque
from datetime import datetime

# Config
SEQUENCE_LENGTH = 30
SAVE_DIR = "Dataset"

# Init
mp_face_mesh = mp.solutions.face_mesh
face_mesh = mp_face_mesh.FaceMesh(static_image_mode=False, max_num_faces=1)
cap = cv2.VideoCapture(0)
sequence = deque(maxlen=SEQUENCE_LENGTH)

# Create save dir if not exist
if not os.path.exists(SAVE_DIR):
    os.makedirs(SAVE_DIR)

def extract_face_keypoints(results):
    if not results.multi_face_landmarks:
        return np.zeros((468, 3))  # Return zero if no face
    face = results.multi_face_landmarks[0]
    return np.array([[lm.x, lm.y, lm.z] for lm in face.landmark])

print("[INFO] Starting collection... Press 's' to save a sequence. Press ESC to quit.")

while cap.isOpened():
    ret, frame = cap.read()
    if not ret:
        break

    rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
    results = face_mesh.process(rgb)

    keypoints = extract_face_keypoints(results)
    sequence.append(keypoints.flatten())

    cv2.putText(frame, f"Collected: {len(sequence)}/{SEQUENCE_LENGTH}", (10, 30),
                cv2.FONT_HERSHEY_SIMPLEX, 1, (255, 0, 0), 2)

    cv2.imshow("Collecting", frame)

    key = cv2.waitKey(1)
    if key == 27:  # ESC to quit
        break
    elif key == ord('s') and len(sequence) == SEQUENCE_LENGTH:
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        save_path = os.path.join(SAVE_DIR, f"sequence_{timestamp}.npy")
        np.save(save_path, np.array(sequence))
        print(f"[SAVED] Sequence saved to {save_path}")
        sequence.clear()

cap.release()
cv2.destroyAllWindows()
