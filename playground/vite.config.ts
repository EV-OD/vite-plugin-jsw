import jsw from "vite-plugin-jsw"

export default { 
    plugins: [jsw()],
    build: {
    target: 'esnext'
  }
};