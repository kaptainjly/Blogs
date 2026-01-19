// // src/components/Editor.jsx
// import React from "react";
// import SimpleMDE from "react-simplemde-editor";
// import "simplemde/dist/simplemde.min.css";

// function Editor({ value, onChange, placeholder = "Write your post here..." }) {
//   const options = {
//     spellChecker: false,
//     placeholder,
//     autosave: { enabled: false },
//     toolbar: [
//       "bold", "italic", "|",
//       "quote", "unordered-list", "ordered-list", "|",
//       "link", "image", "|",
//       "preview", "fullscreen"
//     ],
//   };

//   return (
//     <SimpleMDE
//       value={value}
//       onChange={onChange}
//       options={options}
//     />
//   );
// }

// export default React.memo(Editor);




import React from "react";
import SimpleMDE from "react-simplemde-editor";
import "simplemde/dist/simplemde.min.css";

function Editor({ value, onChange, placeholder = "Write your post here..." }) {
  const options = React.useMemo(() => ({
    spellChecker: false,
    placeholder,
    autosave: { enabled: false },
    toolbar: [
      "bold", "italic", "|",
      "quote", "unordered-list", "ordered-list", "|",
      "link", "image", "|",
      "preview", "fullscreen"
    ],
  }), [placeholder]); 

  return (
    <SimpleMDE
      value={value}
      onChange={onChange}
      options={options}
    />
  );
}

export default React.memo(Editor);