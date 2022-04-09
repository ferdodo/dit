FROM node
RUN npm install -g http-server
COPY package.json .
COPY npm-shrinkwrap.json .
RUN npm install
RUN npm audit --audit-level=high
COPY . .
RUN npx --no-install tsc --noEmit
RUN npm run build
CMD http-server public
