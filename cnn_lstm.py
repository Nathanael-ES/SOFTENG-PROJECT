from keras.layers import Input,TimeDistributed, Conv2D, Dense, MaxPooling2D, Flatten, LSTM, Dropout, BatchNormalization
from keras import Model

inputShape=(10,224,224,1)
input=Input(inputShape)

x=TimeDistributed(Conv2D(64, (3, 3), strides=(1,1),padding='same',activation='elu'),input_shape=(10, 224, 224, 1)) (input)
x=TimeDistributed(Conv2D(64, (3, 3), strides=(1,1),activation='elu'))(x)
x=TimeDistributed(MaxPooling2D(2,2))(x)
x=Dropout(0.3)(x)

x=TimeDistributed(Conv2D(128, (3, 3), strides=(1,1),activation='elu'))(x)
x=TimeDistributed(Conv2D(128, (3, 3), strides=(1,1),activation='elu'))(x)
x=TimeDistributed(MaxPooling2D(2,2))(x)
x=TimeDistributed(BatchNormalization())(x)

x=TimeDistributed(Conv2D(256, (3, 3), strides=(1,1),activation='elu'))(x)
x=TimeDistributed(Conv2D(256, (3, 3), strides=(1,1),activation='elu'))(x)
x=TimeDistributed(Conv2D(256, (3, 3), strides=(1,1),activation='elu'))(x)
x=TimeDistributed(Conv2D(256, (3, 3), strides=(1,1),activation='elu'))(x)
x=TimeDistributed(MaxPooling2D(2,2))(x)
x=Dropout(0.3)(x)

x=TimeDistributed(Conv2D(512, (3, 3), strides=(1,1),activation='elu'))(x)
x=TimeDistributed(Conv2D(512, (3, 3), strides=(1,1),activation='elu'))(x)
x=TimeDistributed(Conv2D(512, (3, 3), strides=(1,1),activation='elu'))(x)
x=TimeDistributed(Conv2D(512, (3, 3), strides=(1,1),activation='elu'))(x)

x=TimeDistributed(MaxPooling2D(2,2))(x)
x=TimeDistributed(BatchNormalization())(x)

x=TimeDistributed(Conv2D(512, (3, 3), strides=(1,1),activation='elu'))(x)
x=TimeDistributed(Conv2D(512, (3, 3), strides=(1,1),activation='elu'))(x)
x=TimeDistributed(Conv2D(512, (3, 3), strides=(1,1),activation='elu'))(x)
x=TimeDistributed(Conv2D(512, (3, 3), strides=(1,1),activation='elu'))(x)
x=TimeDistributed(MaxPooling2D(2,2))(x)
x=TimeDistributed(BatchNormalization())(x)


x=TimeDistributed(Flatten())(x)
x=Dropout(0.3)(x)

x=LSTM(512,return_sequences=False,dropout=0.2)(x) # used 32 units

x=Dense(128,activation='elu')(x)
x=Dense(64,activation='elu')(x)
x=Dropout(0.3)(x)
x=Dense(4, activation='softmax')(x)

model=Model(inputs=input,outputs=x,name='Pretict')