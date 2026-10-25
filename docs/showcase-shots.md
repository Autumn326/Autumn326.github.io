# Showcase capture list

Generated from the `showcase` slots in `data/projects.json`. Preview empty slots on a project page with `?preview=1`, e.g. `project.html?id=sign-finder&preview=1`.

Rules: images under about 500 KB. Code images show a short key idea only (about 6 to 20 lines), never a whole file. Clips (`kind: clip`) are 6 seconds max, muted, MP4 (H.264) or WebM, 720p or lower, under 5 MB, saved under `videos/<project>/`; they autoplay muted and looped with no controls (visitors with reduced motion on get a still frame and controls). No YouTube or external video links. Crop out any student ID, university name, IPs or credentials. When media is added, fill in `src`, `alt` and `caption` on the slot.

## Sign Finder (`sign-finder`)
- [ ] **screenshot: Photo scan with bounding boxes**. Scan tab with a photo containing 2+ signs, boxes, labels and the confidence list visible. This is the hero shot. Save as `images/sign-finder/scan.jpg`.
- [ ] **screenshot: Live scan**. Live Scan tab with a box drawn on a sign in the camera feed. Save as `images/sign-finder/live-scan.png`.
- [ ] **screenshot: Sign info and settings**. Info tab with a category expanded, and the Settings picker for quality and frame interval (side by side in one image). Save as `images/sign-finder/info-settings.png`.
- [ ] **diagram: Pipeline: data to app**. Simple redrawn flow: public datasets + own LabelImg photos -> Python merge/convert -> Create ML (YOLOv2) -> Core ML in SwiftUI. Redraw rather than using report figures that carry report headers. Save as `images/sign-finder/pipeline.png`.
- [ ] **screenshot: Annotating in LabelImg**. LabelImg with boxes drawn on one of your own photos (shows the dataset work). Save as `images/sign-finder/labelimg.png`.
- [ ] **screenshot: Model evaluation**. Create ML evaluation/test-scan view or the CNN confusion matrix, cropped to the chart only. Save as `images/sign-finder/evaluation.png`.
- [ ] **code: Run the model on every Nth frame**. ScanView/LiveScanViewModel: the frameCounter % frameProcessingInterval guard plus the VNCoreMLRequest. About 12 lines. Shows how battery use is controlled. Save as `images/sign-finder/code-live-frames.png`.
- [ ] **code: Boxes in the right place**. The GeometryReader + ZStack block in ScanView that converts Vision's normalised boxes to screen coordinates. About 15 lines. Save as `images/sign-finder/code-boxes.png`.
- [ ] **code: Pascal VOC to Create ML boxes**. The small conversion from corner coordinates to centre + width/height. About 8 lines. Save as `images/sign-finder/code-convert.png`.
- [ ] **clip: Clip: live scan on a sign**. 6 s max: camera pointed at a sign, box and label appear. Save as `videos/sign-finder/live-scan.mp4`.

## Sudoku Solver (`sudoku-solver`)
- [ ] **screenshot: The app solving a puzzle**. App window with the hardest puzzle entered and solved. Save as `images/sudoku-solver/app.png`.
- [ ] **code: Eliminate: the cascade**. solver.py eliminate(): the two rules (single candidate removes from peers; one home for a digit places it). About 20 lines, the core idea. Save as `images/sudoku-solver/code-eliminate.png`.
- [ ] **code: Search: fewest candidates first**. solver.py search(): choose the square with the fewest options, try each on a copy. About 12 lines. Save as `images/sudoku-solver/code-search.png`.
- [ ] **screenshot: Tests passing and timing**. Terminal after `python3 test_solver.py` showing tests pass and the timings table. Save as `images/sudoku-solver/tests.png`.
- [ ] **diagram: Candidates before and after propagation**. Two grids side by side for one puzzle: all candidates at the start, remaining candidates after propagation (even a hand-made image works). Save as `images/sudoku-solver/propagation.png`.
- [ ] **clip: Clip: solve the hardest puzzle**. 6 s max: enter the puzzle and press Solve. Save as `videos/sudoku-solver/solve.mp4`.

## Theatre Booking System (C++) (`theatre-booking-cpp`)
- [ ] **screenshot: Main menu**. Console showing the numbered menu (buy, seat map, cancel, list, save, load, tickets, sort, quit). Save as `images/theatre-booking-cpp/menu.png`.
- [ ] **screenshot: Seat map with bookings**. Seat map after booking a few seats, in the console. Save as `images/theatre-booking-cpp/seat-map.png`.
- [ ] **screenshot: Catch tests passing**. Terminal output of run_tests showing all 9 test cases passing. Save as `images/theatre-booking-cpp/tests.png`.
- [ ] **diagram: Class diagram**. Boxes for Ticket, Person, Row, Auditorium and the SeatState enum with their relationships (draw.io is fine). Save as `images/theatre-booking-cpp/classes.png`.
- [ ] **code: Row::book and cancel**. Row.cpp book() and cancel(): rules live in one place. About 10 lines. Save as `images/theatre-booking-cpp/code-row.png`.
- [ ] **code: A Catch test**. One test, for example booking an already-booked seat fails. About 8 lines. Save as `images/theatre-booking-cpp/code-test.png`.
- [ ] **clip: Clip: buy a ticket and see the seat update**. 6 s max: buy a ticket, then print the seat map showing it booked. Save as `videos/theatre-booking-cpp/buy.mp4`.

## iOS Weather App (`ios-weather-app`)
- [ ] **clip: Clip: tap an attraction, map recentres**. 6 s max: tap an attraction in the list and the map recentres on it. Save as `videos/ios-weather-app/recentre.mp4`.
- [ ] **screenshot: Current weather and air quality**. Current weather screen. Save as `images/ios-weather-app/current.png`.
- [ ] **screenshot: Hourly and daily forecast**. Forecast screens side by side. Save as `images/ios-weather-app/forecast.png`.
- [ ] **screenshot: Map of attractions**. Map with annotations and the attraction list. Save as `images/ios-weather-app/map.png`.
- [ ] **screenshot: Visited places with swipe action**. Visited places list with the blue swipe-to-refresh button showing. Save as `images/ios-weather-app/visited-swipe.png`.
- [ ] **code: Tap to recentre the map (my enhancement)**. The tap gesture in the map/list view that updates the map region. About 8 lines. Save as `images/ios-weather-app/code-recentre.png`.
- [ ] **code: Swipe to refresh a saved place (my enhancement)**. The swipeActions block in VisitedPlacesView. About 10 lines. Save as `images/ios-weather-app/code-swipe.png`.
- [ ] **clip: Clip: swipe a saved place to refresh**. 6 s max: swipe right on a saved place and tap the blue refresh button. Save as `videos/ios-weather-app/swipe-refresh.mp4`.

## Applied AI: RNN Sentiment Analysis (`applied-ai-rnn`)
- [ ] **diagram: RNN diagram**. Your compact and expanded RNN diagrams from the notebook, as one image. Save as `images/applied-ai-rnn/rnn-diagram.png`.
- [ ] **code: Model definition**. The Sequential model: Embedding, SimpleRNN(32), Dense sigmoid. About 6 lines. Save as `images/applied-ai-rnn/code-model.png`.
- [ ] **screenshot: Training output**. Epoch log showing accuracy and loss rising/falling. Save as `images/applied-ai-rnn/training.png`.
- [ ] **screenshot: Confusion matrix**. Cropped matrix plot showing the bias toward negative. Save as `images/applied-ai-rnn/confusion.png`.
- [ ] **screenshot: Predicting new text**. predict_sentiment on two or three sentences with outputs. Save as `images/applied-ai-rnn/predict.png`.

## Applied Robotics: Q-Learning Taxi (`applied-robotics-qlearning`)
- [ ] **screenshot: Learning curve**. Total reward per episode plot, rising then flattening near episode 250. Save as `images/applied-robotics-qlearning/learning-curve.png`.
- [ ] **screenshot: Taxi grid in action**. env.render() frame of the 5x5 grid mid-route (or a short GIF if under 500 KB). Save as `images/applied-robotics-qlearning/grid.png`.
- [ ] **code: The Q-update and reward values**. The Bellman update line plus the alpha/gamma/epsilon settings. About 10 lines. Save as `images/applied-robotics-qlearning/code-qupdate.png`.
- [ ] **screenshot: Neural network loss curve**. Loss curve of the MLP imitating the policy. Save as `images/applied-robotics-qlearning/loss.png`.
- [ ] **screenshot: Neural network confusion matrix**. Matrix showing north/west and south/east confusions. Save as `images/applied-robotics-qlearning/confusion.png`.
- [ ] **screenshot: 1000 random environments test**. Output of testMultipleEnvs with the average reward. Save as `images/applied-robotics-qlearning/random-envs.png`.

## Health System REST API (`health-system-api`)
- [ ] **clip: Clip: one request and its JSON response**. 6 s max: send a request in the client and show the response. Save as `videos/health-system-api/request.mp4`.
- [ ] **screenshot: Calling an endpoint**. A client (Postman or similar) calling GET all doctors and a create call, showing the JSON. Save as `images/health-system-api/request.png`.
- [ ] **diagram: Resource map**. A table or diagram of the 6 resources and their create/read/update/delete paths. Save as `images/health-system-api/resources.png`.
- [ ] **diagram: Layers**. Resource -> DAO -> model, with exception mappers on the side. Save as `images/health-system-api/layers.png`.
- [ ] **code: A resource method**. One JAX-RS method from DoctorResource: annotations, path parameter, response. About 12 lines. Save as `images/health-system-api/code-resource.png`.
- [ ] **code: Exception mapper**. ResourceNotFoundExceptionMapper turning an exception into a 404 response. About 10 lines. Save as `images/health-system-api/code-mapper.png`.
- [ ] **screenshot: Error response**. Client showing the 404 JSON for a missing record. Save as `images/health-system-api/error.png`.

## R Data Science: Forecasting and Clustering (`r-data-science`)
- [ ] **screenshot: Choosing the number of clusters**. Elbow, gap statistic and silhouette plots together, all pointing to 2. Save as `images/r-data-science/cluster-count.png`.
- [ ] **screenshot: Clusters plotted**. The 2-cluster k-means plot (before or after PCA). Save as `images/r-data-science/clusters.png`.
- [ ] **screenshot: Silhouette plot before and after PCA**. Side by side to show the improvement. Save as `images/r-data-science/silhouette.png`.
- [ ] **screenshot: Predicted versus actual exchange rate**. Scatter plot for the best network (10 and 8 nodes). Save as `images/r-data-science/forecast.png`.
- [ ] **screenshot: Neural network model comparison**. The comparison table of RMSE, MAE, MAPE and sMAPE (crop out any ID). Save as `images/r-data-science/nn-table.png`.
- [ ] **code: Building the lag matrix**. The few lines that create t-1..t-4 inputs from the exchange-rate column. About 8 lines. Save as `images/r-data-science/code-lag.png`.

## OOP: Shopping Manager (`oop-shopping-manager`)
- [ ] **diagram: Class diagram**. OOP_Class_UML export as PNG (check no student ID in it). Save as `images/oop-shopping-manager/class-diagram.png`.
- [ ] **diagram: Use case diagram**. OOP_Use_Case_UML export as PNG. Save as `images/oop-shopping-manager/use-case.png`.
- [ ] **screenshot: GUI with cart and discount**. GUI with a category selected, items in the cart and the discounted total. Save as `images/oop-shopping-manager/gui.png`.
- [ ] **screenshot: Console menu**. The 7-option console menu. Save as `images/oop-shopping-manager/menu.png`.
- [ ] **code: Subclass overriding product details**. Electronics or Clothing extending Product. About 12 lines. Save as `images/oop-shopping-manager/code-inheritance.png`.

## Database Systems Design (`database-coursework`)
- [ ] **diagram: Part A: ER model**. CourseworkERD redrawn or edited so every table name has no student ID prefix. The generalisation (specialisation) areas are the highlight. Save as `images/database-coursework/erd.png`.
- [ ] **diagram: Part B: tour company design**. PartBTourmato redrawn without the ID prefix; highlight the linking tables. Save as `images/database-coursework/tourmato.png`.
- [ ] **screenshot: Zoom on specialisation**. Cropped close-up of accommodation (apartment / stand-alone room) with its constraint labels. Save as `images/database-coursework/specialisation.png`.
- [ ] **screenshot: Zoom on a linking table**. Cropped close-up of Tour_Session_Attraction_Coverage with composite key. Save as `images/database-coursework/linking-table.png`.

## Cyber Security: Penetration Test Report (`cyber-security-pentest`)
- [ ] **diagram: Methodology flow**. Redrawn stages: passive recon -> active scan -> fingerprint -> vulnerability analysis -> exploit -> report and mitigate. Save as `images/cyber-security-pentest/method.png`.
- [ ] **screenshot: Scan output (lab only)**. One Nmap result from the lab machine with all IPs/hostnames cropped or blurred. Save as `images/cyber-security-pentest/nmap.png`.
- [ ] **screenshot: Wireshark capture**. A capture showing the handshake of SYN vs connect scan, addresses blurred. Save as `images/cyber-security-pentest/wireshark.png`.
- [ ] **diagram: Attack and defence table**. Table pairing each weakness with its mitigation (no credentials or real targets). Save as `images/cyber-security-pentest/mitigations.png`.

## Grade Progression Calculator (Python) (`grade-progression`)
- [ ] **screenshot: Program run**. Terminal run showing validation errors then a valid entry and the outcome. Save as `images/grade-progression/run.png`.
- [ ] **screenshot: Histogram summary**. The histogram-style summary at the end. Save as `images/grade-progression/histogram.png`.
- [ ] **code: Input validation loop**. The try/except loop that only accepts allowed credit values. About 10 lines. Save as `images/grade-progression/code-validation.png`.

## Theatre Booking System (Java) (`theatre-booking-java`)
- [ ] **screenshot: Console run**. Java console buying a ticket and showing the seating area. Save as `images/theatre-booking-java/run.png`.
- [ ] **code: Saving the seating plan**. The save() method writing 0s and 1s. About 10 lines. Save as `images/theatre-booking-java/code-save.png`.
- [ ] **diagram: Java versus C++ comparison**. Small side-by-side table: arrays and big methods vs classes and tests. Save as `images/theatre-booking-java/compare.png`.
