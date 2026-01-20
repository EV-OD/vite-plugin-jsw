import jsw from "@allwcons/vite-plugin-jsw"

export default { 
    plugins: [jsw()],
    build: {
    target: 'esnext'
  }
};