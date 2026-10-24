# Portfolio project summaries (Michael Chen)

Source: D:\Backup Files\PortfolioProjects (read only). Dates come from reports, file contents and course codes where possible; Windows file dates mostly reflect when files were copied, so treat them as approximate. Course codes starting 4/5/6 suggest year 1/2/3 of a BSc Computer Science at the University of Westminster.

## Showcase-worthy
1. **Sign Finder (Final Year Project)**, 2024-25. iOS app that identifies road signs with an on-device ML model, plus the report. Swift, SwiftUI, Core ML, Vision, AVFoundation; model trained with Create ML (compared YOLOv2, MobileNet and YOLOv5) on a custom dataset merged from Kaggle sets plus own images annotated in LabelImg. Features: scan from photo, live camera scan, road sign info screen, camera quality setting. Up to 96% accuracy in good conditions; weak on far-away signs. Report submitted May 2025 (supervisor Dimitris Dracopoulos). Also a Python/TensorFlow CNN notebook (Conv2D/MaxPooling, 128x128 input, coremltools) used in model experimentation.
2. **Sudoku Solver**, mid-2026. Python solver using constraint propagation then backtracking, with a small app (app.py), a .bat launcher and unit tests. README reports about 5 ms on the hardest known puzzle.
3. **Theatre Booking System (C++)**, Aug-Sep 2026 rewrite of an earlier Java coursework. Console menu app: buy/cancel tickets, seat map, list free seats, save/load, ticket sorting. Classes Ticket, Person, Row, Auditorium; Catch unit tests; has a git repo.
4. **iOS Weather App**, 2024 (module 6COSC021W Mobile Native). SwiftUI app with current, hourly and daily weather, a map of tourist attractions, and saved visited places. Own enhancements: tap an attraction to recentre the map, swipe a saved place to refresh its data.

## Coursework projects
5. **Applied AI: RNN sentiment analysis**, 2024-25. Python, Keras/TensorFlow, scikit-learn. Simple RNN on tweet sentiment, 85.3% test accuracy, confusion matrix, prediction function. Same notebook covers CNN/RNN written analysis.
6. **Applied Robotics: Q-learning taxi**, 2024-25. Python, matplotlib, Gym-style 5x5 taxi grid. Reward design, epsilon decay, learning curves, tests on random environments.
7. **Client-Server Architecture: Health System API**, May 2024. Java, Maven, Jersey (JAX-RS) REST API, NetBeans project, demo video included (354 MB).
8. **R Data Science coursework (5DATA002W)**, April 2024. R: neural network forecasting of USD/EUR exchange rates (neuralnet, Metrics), and k-means partitioning clustering of white wine data (NbClust, elbow, gap, silhouette, PCA, z-score outlier removal). Report PDF.
9. **OOP coursework (5COSC019W)**, Jan 2024. Java, Maven. Westminster Shopping Manager with Product, Electronics, Clothing, ShoppingCart; UML use case and class diagrams, test plan, demo video on YouTube.
10. **Database Systems coursework (5COSC020W)**, Oct-Nov 2023. ER diagram (draw.io), Part A report, Part B ("Tourmato") design. SQL content is in the PDFs only.
11. **Cyber Security coursework**, 2024-25. Penetration-test write-up on a lab domain: OSINT/DNS enumeration, Nmap, Metasploit, Wireshark, John.
12. **Python grade progression coursework**, Nov 2022. Python console program that sorts and categorises student credits (Progress, Trailer, Retriever, Excluded) with a histogram-style summary. Git repo "Sorting-Grades-Coursework-2022". Early project.
13. **Software Dev Coursework 2**, 2022-23. Java console theatre booking (the original of the C++ rewrite): arrays, ArrayList, file saving. The PDF is code only.

## Notes
- Nothing was zipped; all folders were readable. No files were changed.
- Best portfolio candidates: Sign Finder, Sudoku Solver, Theatre Booking (C++), Weather App, plus a "coursework" section for the rest.
- Concerns before publishing: coursework may be subject to university plagiarism rules, so link to write-ups rather than source for those. Student ID appears in several filenames and PDFs. The 354 MB demo video and 32 MB Core ML model exceed sensible GitHub Pages limits, so host video on YouTube.
