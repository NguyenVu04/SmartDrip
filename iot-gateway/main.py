// Load Wi-Fi library
#include <WiFi.h>
#include <Arduino.h>
#include "freertos/FreeRTOS.h"
#include "freertos/task.h"
#include "esp_system.h"
#include "esp_log.h"
#include "driver/uart.h"
#include "string.h"
#include "driver/gpio.h"
#include <AdafruitIO.h> // tiến hành thêm thư viện AdafruitIO.h vào

#define IO_USERNAME  "HeroHao"
#define IO_KEY       "aio_lpqA26j54D9mkXRgEHJwRt5qSjSP"

#define WIFI_SSID "ACLAB" // Tên wifi để ESP 32 kết nối vào và truy cập đến server.
#define WIFI_PASS "ACLAB2023"  // Pass wifi

#include <AdafruitIO_WiFi.h>  // Khai báo thư viện AdafruitIO_WiFi.h để kết nối đến server.
AdafruitIO_WiFi io(IO_USERNAME, IO_KEY, WIFI_SSID, WIFI_PASS);  // Gọi hàm kết nối đến server.

#define LED_PIN 2 // LED on Board là GPIO 2.

// set up the 'button1' feed 
AdafruitIO_Feed *button1 = io.feed("button1"); // khai báo con trỏ button1 để chứ dữ liệu lấy từ feed của server.
AdafruitIO_Feed *temperature = io.feed("temperature"); // khai báo con trỏ button1 để chứ dữ liệu lấy từ feed của server.
AdafruitIO_Feed *humidity = io.feed("humidity"); // khai báo con trỏ button1 để chứ dữ liệu lấy từ feed của server.
AdafruitIO_Feed *soil_moisture = io.feed("soil_moisture"); // khai báo con trỏ button1 để chứ dữ liệu lấy từ feed của server.
#define TXD_PIN (GPIO_NUM_17)
#define RXD_PIN (GPIO_NUM_16)
 
#define TXD2_PIN (GPIO_NUM_4)  // UART1 TX
#define RXD2_PIN (GPIO_NUM_5)  // UART1 RX
// Replace with your network credentials
unsigned long currentTime = millis();
// Previous time
unsigned long previousTime = 0;
// Define timeout time in milliseconds (example: 2000ms = 2s)
const long timeoutTime = 2000;

float value;
float value1;
int value2;
void setup() {
  Serial.begin(115200);

 
 // Config UART2
    const uart_port_t uart_num = UART_NUM_2;
    uart_config_t uart_config = {
        .baud_rate = 115200,
        .data_bits = UART_DATA_8_BITS,
        .parity = UART_PARITY_DISABLE,
        .stop_bits = UART_STOP_BITS_1,
        .flow_ctrl = UART_HW_FLOWCTRL_CTS_RTS,
        .rx_flow_ctrl_thresh = 122,
    };
    ESP_ERROR_CHECK(uart_param_config(uart_num, &uart_config));
    ESP_ERROR_CHECK(uart_set_pin(UART_NUM_2, TXD_PIN, RXD_PIN, UART_PIN_NO_CHANGE, UART_PIN_NO_CHANGE));
    const int uart_buffer_size = (1024 * 2);
    QueueHandle_t uart_queue;
    ESP_ERROR_CHECK(uart_driver_install(UART_NUM_2, uart_buffer_size, uart_buffer_size, 10, &uart_queue, 0));
 
    // Config UART1
    const uart_port_t uart_num1 = UART_NUM_1;
 
    ESP_ERROR_CHECK(uart_param_config(uart_num1, &uart_config));
    ESP_ERROR_CHECK(uart_set_pin(UART_NUM_1, TXD2_PIN, RXD2_PIN, UART_PIN_NO_CHANGE, UART_PIN_NO_CHANGE));
    ESP_ERROR_CHECK(uart_driver_install(UART_NUM_1, uart_buffer_size, uart_buffer_size, 10, &uart_queue, 0));
      pinMode(LED_PIN, OUTPUT); // Khai báo output.

while(! Serial);
 
  // connect to io.adafruit.com
  Serial.println("Connecting to Adafruit IO"); // tiến hành kết nối đến server.
  io.connect(); // Gọi hàm kết nối
 button1->onMessage(handleMessage);
 
  // wait for a connection
  while(io.status() < AIO_CONNECTED) {
    Serial.println("Can't connect to Adafruit IO  "); // Nếu chưa kết nối được đến server sẽ tiến hành xuất ra màn hình đấu "."
    delay(500);
  }
 
  // we are connected
  Serial.println();
  Serial.println(io.statusText()); // Nếu đã kết nối thành công tiến hành xuất ra màn hình trạng thái.
  // set up a message handler for the 'button1' feed.
  // the handleMessage function (defined below)
  // will be called whenever a message is
  // received from adafruit io.
  button1->get(); // lấy dữ liệu từ feed 'button1' của server.
  button1->onMessage(handleMessage); // Gọi hàm đọc dữ liệu và tiến hành điều khiển led và xuất ra trạng thái trên màn hình.
 
}

void loop() {
    const uart_port_t uart_num = UART_NUM_2;
    uint8_t data[128];
    int length = 0;
    ESP_ERROR_CHECK(uart_get_buffered_data_len(uart_num, (size_t*)&length));
    length = uart_read_bytes(uart_num, data, length, 100);
    if (length > 0) {
        char * test = (char*) data;
     value = strtof(test, nullptr); // Sử dụng strtof để chuyển đổi
             Serial.println(test);


    }
 
    // Read data from UART1
    const uart_port_t uart_num1 = UART_NUM_1;
    uint8_t data1[128];
    int length1 = 0;
    ESP_ERROR_CHECK(uart_get_buffered_data_len(uart_num1, (size_t*)&length1));
    length1 = uart_read_bytes(uart_num1, data1, length1, 100);
    if (length1 > 0) {
     char *test1 = (char*)data1;

        // Kiểm tra xem chuỗi có chứa dấu '%' hay không
        if (strchr(test1, '%')) {
            // Nếu có dấu '%', chuyển đổi thành int
            char *percentSign = strchr(test1, '%');
            *percentSign = '\0';  // Tạm thời cắt chuỗi tại dấu '%'
            value2 = atoi(test1);
            Serial.print("Dữ liệu int: ");
            Serial.println(value2);
        } else {
            // Nếu không có dấu '%', chuyển đổi thành float
            value1 = strtof(test1, nullptr);
            Serial.print("Dữ liệu float: ");
            Serial.println(value1);
        }
    }
    io.run(); // gọi hàm Run.
  static unsigned long lastTime = 0;
  if (millis() - lastTime > 10000) {
    lastTime = millis();

    // Gửi giá trị lên feed
    temperature->save(value); // Gửi giá trị lên feed
    Serial.print("Sent: ");
    Serial.println(value);
        // Gửi giá trị lên feed
    humidity->save(value1); // Gửi giá trị lên feed
    Serial.print("Sent: ");
    Serial.println(value1);
    soil_moisture->save(value2); // Gửi giá trị lên feed
    Serial.print("Sent: ");
    Serial.println(value2);
}
}
void handleMessage(AdafruitIO_Data *data) { // hàm handleMessage để đọc dữ liệu.

 // xuất ra màn hình trạng thái của nút nhấn trên feed vừa đọc được.
  Serial.print("received <- ");
 
  if(data->toPinLevel() == HIGH)
    Serial.println("HIGH");
  else
    Serial.println("LOW");

 // cài đặt trạng thái bật tắt led on board tương ứng với nút nhấn.
  // write the current state to the led
  digitalWrite(LED_PIN, data->toPinLevel());
 
}
