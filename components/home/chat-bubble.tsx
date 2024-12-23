import { MessageSeenSvg } from "@/lib/svgs";
import { IMessage, useConversationStore } from "@/store/chat-store";
import ChatBubbleAvatar from "./chat-bubble-avatar";
import DateIndicator from "./date-indicator";
import Image from "next/image";
// import { MediaImageDialog } from "./media-dropdown";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "../ui/dialog";
import { useState } from "react";
import ReactPlayer from "react-player";

/* eslint-disable @typescript-eslint/no-explicit-any */
type ChatBubbleProps = {
	message: IMessage;
	me: any;
	previousMessage: IMessage | null | undefined;
}

const ChatBubble = ({message, me, previousMessage}: ChatBubbleProps) => {
	const date = new Date(message._creationTime);
	const hour = date.getHours().toString().padStart(2, "0");
	const minute = date.getMinutes().toString().padStart(2, "0");
	const time = `${hour}:${minute}`;

	const {selectedConversation} = useConversationStore();
	const isMember = selectedConversation?.participants.includes(message.sender?._id) || false;
	const isGroup = selectedConversation?.isGroup;
	const fromMe = message.sender?._id === me?._id;

	const [open, setOpen] = useState<boolean>(false);
	
	const bgClass = fromMe? "bg-green-chat" : "bg-white dark:bg-gray-primary";

	const renderMessageContent = () => {
		switch (message.messageType) {
			case "text":
				return <TextMessage message={message} />
			case "image":
				return <ImageMessage handleClick={()=> setOpen(true)} message={message} />
			case "video":
				return <VideoMessage message={message} />
		}
	}

	if(!fromMe) {
		return (
			<>
				<DateIndicator message={message} previousMessage={previousMessage!} />

				<div className="flex gap-1 w-2/3">
					<ChatBubbleAvatar message={message} isGroup={isGroup} isMember={isMember} />				
					<div className={`flex flex-col z-20 max-w-fit px-2 pt-1 rounded-md shadow-md relative ${bgClass}`}>
						<OtherMessageIndicator />
						
						{renderMessageContent() }

						{open && <ImageDialogViewer 
							imageUrl={message.content} 
							open={open}
							onClose={()=> setOpen(false)}
						/>}

						
						<MessageTime time={time} fromMe={fromMe} />
					</div>
				</div>
			</>
		)
	}

	return (
		<>
				<DateIndicator message={message} previousMessage={previousMessage!} />

			<div className="flex gap-1 ml-auto w-2/3">
				<div className={`flex flex-col z-20 max-w-fit ml-auto px-2 pt-1 rounded-md shadow-md relative ${bgClass}`}>
					<SelfMessageIndicator />
					
					{ renderMessageContent() }

					{open && <ImageDialogViewer 
						imageUrl={message.content} 
						open={open}
						onClose={()=> setOpen(false)}
					/>}
					
						
					<MessageTime time={time} fromMe={fromMe} />
				</div>
			</div>
		</>
	)
};
export default ChatBubble;



const OtherMessageIndicator = () => (
	<div className="absolute bg-white dark:bg-gray-primary top-0 -left-[4px] w-3 h-3 rounded-bl-full">
	</div>
);

const SelfMessageIndicator = () => (
	<div className="absolute bg-green-chat top-0 -right-[3px] w-3 h-3 rounded-br-full overflow-hidden">
	</div>
);


const TextMessage = ({message}: {message: IMessage}) => {
	// Check if content is a url
	const isLink = /^(ftp|http|https):\/\/[^ "]+$/.test(message.content);

	return (
		<div>
			{isLink ? (
				<a 
					href={message.content}
					target="_blank"
					rel="noopener noreferrer"
					className={`mr-2 text-sm font-light text-blue-400 underline`}
					>
						{message.content}
				</a>
			): (
				<p className={`mr-2 text-sm font-light`}>{message.content}</p>
			)}
		</div>
	);
};

const MessageTime = ({time, fromMe}: {time: string, fromMe: boolean}) => {
	return (
		<p className="flex text-[10px] mt-2 self-end gap-1 items-center">
			{time} {fromMe && <MessageSeenSvg />}
		</p>
	)
}


const ImageMessage = ({message, handleClick}: {message: IMessage, handleClick: ()=> void}) => {
	// Check if content is a url

	return (
		<div className="w-[250px] h-[250px] m-2 relative">
			<Image 
				src={message.content}
				fill
				className="cursor-pointer object-cover rounded"
				alt="image"
				onClick={handleClick}
			/>
		</div>
	);
};

const VideoMessage = ({message}: {message: IMessage}) => {
	// Check if content is a url

	return (
			<ReactPlayer 
				url={message.content}
				controls={true}
				width="250px"
				height="250px"
				className="cursor-pointer"
				alt="video"
				light
			/>
	);
};

const ImageDialogViewer = ({imageUrl, open, onClose}: {imageUrl: string, open:boolean, onClose: ()=>void}) => {
	return (
        <Dialog
            open={open}
            onOpenChange={(isOpen) => {
				console.log(isOpen);
				
                if(!isOpen) onClose();
            }}
        >
            <DialogContent>
                {/* Title to avoid Visually Impared errors*/}
                <DialogTitle hidden></DialogTitle>
                <DialogDescription className='flex flex-col gap-10 justify-center items-center'>
                    <Image src={imageUrl} width={300} height={300} alt='Selected image' />
                </DialogDescription>
            </DialogContent>
        </Dialog>
	)
}
