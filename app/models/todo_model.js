module.exports = mongoose => {
  const ToDo = mongoose.model(
    "toDo",
    mongoose.Schema(
      {
        id: Number,
        title: String,
        is_complete: Boolean
      },
      { timestamps: true }
    )
  );

  return ToDo;
};