FROM ghcr.io/cirruslabs/flutter:latest

WORKDIR /home/mobile
COPY . .

RUN flutter build apk --release

RUN mkdir ../delivery

CMD cp build/app/outputs/flutter-apk/* ../delivery/
