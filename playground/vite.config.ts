import jsw from "@jsw/vite-plugin-jsw"

export default { 
    plugins: [jsw()],
    build: {
    target: 'esnext'
  }
};