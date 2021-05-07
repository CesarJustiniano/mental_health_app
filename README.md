# mental_health_app

In order to run this source code:
1. Reach the folder **frontend** from terminal 
   - Example: C:\Users\\{nameOfUser}\WebstormProjects\mental_health_app\frontend>
2. Execute the command **npm install** or **yarn install** to ensure you have all dependencies up to date
3. Execute the command **npm start** or **yarn start**
4. In another terminal, reach the folder **backend**
   - Example: C:\Users\\{nameOfUser}\WebstormProjects\mental_health_app\backend>
5. Execute the command **npm install** or **yarn install** to ensure you have all dependencies up to date
6. Execute the command **npm start** or **yarn start**
7. On the new tab page of your default internet browser, _http://localhost:19002/_, turn on **Production Mode**
8. Since this application was not deployed, you will need to adjust the _baseURL_ on the file **api.tsx**
   - **api.tsx** file is located: \mental_health_app\frontend\constants\api.tsx
   - Here is a image of the file: 
![BaseURL code](https://user-images.githubusercontent.com/25636543/117503560-1be1eb80-af4f-11eb-861f-ac11f8de183c.PNG)
   - _Your local network_ = IP address that appears before :19000 
   - ![local network](https://user-images.githubusercontent.com/25636543/117505929-d6bfb880-af52-11eb-886c-7897d1e01d6f.PNG)
9. To run the iOS simulator follow this [![video](http://img.youtube.com/vi/0-S5a0eXPoc?t=880/0.jpg)](https://www.youtube.com/watch?v=0-S5a0eXPoc?t=880)
10. Alternatively, you can run this application from your iOS decive by downloading "Expo Go" app
11. Scan the barcode with your iOS device's camera
12. Unfortunately, for android the frontend is not fully implemented to render the UI appropriately
