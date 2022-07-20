import channel from "../models/channel.js";

export const getChannels = async (req, res) => {
  const channels = await channel.find();
  res.status(200).json(channels);
};

export const getChannel = async (req, res) => {
  try {
    const channelInput = await channel.findById(req.params.id);
    res.status(200).json(channelInput);
  } catch (error) {
    console.log(error);
  }
};

export const addNewChannel = async (req, res) => {
  try {
    const channelName = req.body.name;
    const lat = req.body.latitude;
    const lon = req.body.longitude;
    const desc = req.body.description;
    const fieldName1 = req.body?.fieldName1;
    const value1 = req.body?.value1;
    const fieldName2 = req.body?.fieldName2;
    const value2 = req.body?.value2;
    const fieldName3 = req.body?.fieldName3;
    const value3 = req.body?.value3;

    const newchannel = new channel({
      name: channelName,
      description: desc,
      latitude: lat,
      longitude: lon,

      fieldName1,
      fieldName2,
      fieldName3,
      fieldValue1: [{ value: value1 }],
      fieldValue2: [{ value: value2 }],
      fieldValue3: [{ value: value3 }],
    });
    newchannel.save();
    res.status(200).json(newchannel);
  } catch (error) {
    console.log(error);
  }
};

export const addValues = async (req, res) => {
  console.log("Insdie put methof");
  try {
    const value1 = req.body.value1;
    const value2 = req.body.value2;
    const value3 = req.body.value3;

    console.log(value1, value2, value3);
    // const channelModel = await channel.findById(req.params.id)

    const updated = await channel.findByIdAndUpdate(
      {
        _id: req.params.id,
      },

      {
        $push: {
          fieldValue1: [
            {
              date: Date.now(),
              value: value1,
            },
          ],
          fieldValue2: [
            {
              date: Date.now(),
              value: value2,
            },
          ],
          fieldValue3: [
            {
              date: Date.now(),
              value: value3,
            },
          ],
        },
      },
      { new: true }
    );
    res.status(200).json(updated);
  } catch (error) {
    console.log(error);
  }
};
