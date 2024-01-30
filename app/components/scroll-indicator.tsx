import { motion } from 'framer-motion'

type Props = {
	height?: number
	width?: number
}

export function ScrollIndicator({ height = 96, width = 90 }: Props) {
	return (
		<button
			className="rounded-[50%]"
			onClick={() => {
				window.scrollBy({
					top: 600,
					behavior: 'smooth',
				})
			}}
		>
			<svg
				height={height}
				width={width}
				viewBox="0 0 96 78"
				fill="#7F7D97"
				xmlns="http://www.w3.org/2000/svg"
			>
				<motion.path
					fillRule="evenodd"
					clipRule="evenodd"
					animate={{
						y: [0, 3, 0],
					}}
					transition={{ ease: 'linear', duration: 2, repeat: Infinity }}
					d="M40.75 36C40.75 33.9446 41.5665 31.9733 43.0199 30.5199C44.4733 29.0665 46.4446 28.25 48.5 28.25C50.5554 28.25 52.5267 29.0665 53.9801 30.5199C55.4335 31.9733 56.25 33.9446 56.25 36V42C56.25 44.0554 55.4335 46.0267 53.9801 47.4801C52.5267 48.9335 50.5554 49.75 48.5 49.75C46.4446 49.75 44.4733 48.9335 43.0199 47.4801C41.5665 46.0267 40.75 44.0554 40.75 42V36ZM48.5 29.75C46.8424 29.75 45.2527 30.4085 44.0806 31.5806C42.9085 32.7527 42.25 34.3424 42.25 36V42C42.25 43.6576 42.9085 45.2473 44.0806 46.4194C45.2527 47.5915 46.8424 48.25 48.5 48.25C50.1576 48.25 51.7473 47.5915 52.9194 46.4194C54.0915 45.2473 54.75 43.6576 54.75 42V36C54.75 34.3424 54.0915 32.7527 52.9194 31.5806C51.7473 30.4085 50.1576 29.75 48.5 29.75ZM48.5 31.25C48.6989 31.25 48.8897 31.329 49.0303 31.4697C49.171 31.6103 49.25 31.8011 49.25 32V35C49.25 35.1989 49.171 35.3897 49.0303 35.5303C48.8897 35.671 48.6989 35.75 48.5 35.75C48.3011 35.75 48.1103 35.671 47.9697 35.5303C47.829 35.3897 47.75 35.1989 47.75 35V32C47.75 31.8011 47.829 31.6103 47.9697 31.4697C48.1103 31.329 48.3011 31.25 48.5 31.25Z"
				/>
				<motion.g
					className="origin-center"
					animate={{ rotate: 360 }}
					transition={{ ease: 'linear', duration: 20, repeat: Infinity }}
				>
					<path d="M78.2898 39.3048L87.5 40.4503L87.2862 42.0771L83.2102 41.5701L83.2069 41.5956L86.7634 46.055L86.5029 48.0376L82.6471 43.1276L77.2643 47.1081L77.5282 45.1001L82.3316 41.4867L82.3349 41.4613L78.0761 40.9316L78.2898 39.3048Z" />
					<path d="M75.8152 49.6542C76.0788 48.9933 76.4329 48.4719 76.8772 48.0899C77.3216 47.7079 77.8295 47.4736 78.4009 47.387C78.9691 47.3084 79.5724 47.3896 80.2109 47.6306C80.833 47.8655 81.3281 48.1944 81.6962 48.6175C82.0611 49.0484 82.2871 49.5323 82.3743 50.0692C82.4665 50.6171 82.3999 51.1737 82.1743 51.7391C81.8439 52.5672 81.3133 53.1182 80.5825 53.392C79.8484 53.6738 79.0149 53.6385 78.0817 53.2862L77.6274 53.1147L79.2953 48.9341C78.1785 48.6408 77.4041 49.0356 76.9721 50.1185C76.8418 50.445 76.7607 50.79 76.7286 51.1536C76.7048 51.5202 76.7494 51.8806 76.8624 52.2348L75.6642 52.2635C75.538 51.8951 75.4896 51.4737 75.5188 50.9991C75.548 50.5246 75.6468 50.0763 75.8152 49.6542ZM81.1068 51.4048C81.2816 50.9668 81.2838 50.5599 81.1135 50.1841C80.9432 49.8083 80.6318 49.5029 80.1793 49.2679L79.007 52.2062C79.5191 52.3629 79.9537 52.3712 80.3109 52.2312C80.6732 52.1023 80.9385 51.8268 81.1068 51.4048Z" />
					<path d="M72.6317 55.3282C73.0408 54.7415 73.5058 54.3104 74.0268 54.0349C74.5477 53.7594 75.0966 53.6416 75.6735 53.6816C76.2454 53.7287 76.8147 53.9393 77.3815 54.3132C77.9338 54.6776 78.3406 55.106 78.602 55.5985C78.8585 56.098 78.9675 56.6188 78.9289 57.161C78.8927 57.7151 78.6996 58.2431 78.3497 58.745C77.8371 59.4802 77.1932 59.9016 76.4179 60.0093C75.6377 60.1241 74.8334 59.9082 74.005 59.3616L73.6017 59.0955L76.1892 55.3843C75.1683 54.8552 74.3227 55.0713 73.6524 56.0327C73.4503 56.3225 73.2918 56.6411 73.177 56.9885C73.0694 57.3406 73.0299 57.7016 73.0585 58.0714L71.8842 57.8384C71.8459 57.4519 71.8957 57.0306 72.0333 56.5745C72.171 56.1183 72.3705 55.7029 72.6317 55.3282ZM77.3863 58.1867C77.6573 57.7979 77.7531 57.4019 77.6736 56.9985C77.5941 56.5951 77.3609 56.2297 76.974 55.9021L75.1553 58.5106C75.6183 58.7748 76.04 58.8775 76.4204 58.8189C76.8031 58.7721 77.1251 58.5614 77.3863 58.1867Z" />
					<path d="M68.9939 56.5527L74.8993 62.9141L73.7068 63.9617L73.0183 63.22C73.1168 63.5938 73.0999 63.977 72.9674 64.3696C72.8285 64.7679 72.583 65.1216 72.2312 65.4308C71.8141 65.7971 71.358 66.0195 70.8628 66.0978C70.3611 66.1818 69.8545 66.1204 69.3431 65.9136C68.8377 65.7132 68.3525 65.3626 67.8876 64.8618C67.4285 64.3674 67.1163 63.859 66.951 63.3368C66.7915 62.8209 66.7769 62.3273 66.9072 61.856C67.0376 61.3846 67.3145 60.9629 67.7381 60.5908C68.077 60.2931 68.448 60.0938 68.8511 59.9928C69.2536 59.9039 69.6384 59.9169 70.0053 60.0318L67.7721 57.6261L68.9939 56.5527ZM68.9188 61.1936C68.5539 61.5142 68.3783 61.8986 68.3922 62.3468C68.4119 62.8013 68.6542 63.279 69.1191 63.7798C69.5899 64.2869 70.0508 64.5668 70.5019 64.6194C70.9588 64.6783 71.3698 64.5475 71.7347 64.2269C72.0996 63.9063 72.2751 63.5219 72.2613 63.0737C72.2533 62.6318 72.014 62.1573 71.5432 61.6502C71.0783 61.1494 70.6144 60.8663 70.1516 60.8011C69.6946 60.7422 69.2837 60.873 68.9188 61.1936Z" />
					<path d="M60.2233 65.1795C60.7223 64.9678 61.2154 64.8284 61.7026 64.7614C62.1899 64.6944 62.6275 64.7091 63.0155 64.8053L63.061 65.9322C62.6755 65.8629 62.2731 65.8519 61.8537 65.8994C61.4379 65.9548 61.0448 66.061 60.6746 66.2181C60.2884 66.382 60.0307 66.5659 59.9018 66.7697C59.7683 66.9848 59.749 67.198 59.8438 67.4094C59.9912 67.7382 60.3355 67.8437 60.8766 67.7259L62.1838 67.4367C63.2902 67.1909 64.0329 67.4907 64.4121 68.3363C64.5806 68.7121 64.6217 69.0814 64.5353 69.4442C64.4409 69.8104 64.2379 70.1482 63.9263 70.4575C63.6148 70.7667 63.2136 71.0255 62.7226 71.2339C62.3042 71.4115 61.8754 71.5235 61.4365 71.57C61.001 71.6243 60.5956 71.596 60.2201 71.4851L60.1988 70.3479C60.5164 70.4368 60.8648 70.466 61.2439 70.4356C61.615 70.4086 61.9494 70.3319 62.2472 70.2055C62.6415 70.0382 62.9054 69.847 63.0389 69.6319C63.1643 69.4203 63.1779 69.2049 63.0796 68.9856C62.9251 68.6412 62.6009 68.5271 62.1071 68.6435L60.7999 68.9326C60.2346 69.0607 59.7631 69.0558 59.3851 68.918C58.9992 68.7836 58.7114 68.505 58.5218 68.0822C58.2655 67.5107 58.293 66.9632 58.6043 66.4397C58.9191 65.924 59.4588 65.504 60.2233 65.1795Z" />
					<path d="M54.0953 67.0345C54.7558 66.894 55.3595 66.9012 55.9066 67.0559C56.4555 67.2189 56.9173 67.5142 57.292 67.9416C57.6666 68.3691 57.9271 68.9082 58.0733 69.5591C58.2196 70.21 58.2122 70.7973 58.0513 71.3212C57.8923 71.8533 57.5964 72.2966 57.1637 72.6509C56.7329 73.0135 56.1873 73.2651 55.5268 73.4055C55.1236 73.4913 54.7107 73.5135 54.288 73.4722C53.8653 73.431 53.5 73.325 53.192 73.1544L53.4234 71.9643C53.6896 72.1088 53.9754 72.201 54.281 72.2409C54.578 72.2827 54.8551 72.2762 55.1125 72.2215C55.67 72.1029 56.0647 71.8398 56.2967 71.432C56.5219 71.0344 56.5642 70.5226 56.4236 69.8968C56.2848 69.2793 56.025 68.823 55.6442 68.5281C55.2566 68.2433 54.7841 68.1601 54.2266 68.2787C53.9778 68.3316 53.7231 68.4382 53.4626 68.5985C53.202 68.7588 52.9827 68.9629 52.8047 69.2105L52.0811 68.2103C52.2897 67.9386 52.5806 67.6932 52.9537 67.4739C53.3202 67.2648 53.7007 67.1184 54.0953 67.0345Z" />
					<path d="M51.342 67.5877L51.5905 73.8483L49.9849 73.9086L49.9412 72.8075C49.6548 73.562 48.9955 73.997 47.9633 74.1127L47.4647 74.1699L47.3056 72.8168L48.2496 72.6916C49.3247 72.5486 49.8429 71.9906 49.8043 71.0176L49.6706 67.6505L51.342 67.5877Z" />
					<path d="M43.7898 67.1867C44.4492 67.2863 45.001 67.5036 45.4451 67.8386C45.8892 68.1737 46.2074 68.6021 46.3996 69.1238C46.5904 69.654 46.6333 70.2482 46.5282 70.9066C46.4232 71.5649 46.1978 72.1144 45.852 72.5548C45.5063 72.9953 45.0696 73.3097 44.542 73.498C44.0143 73.6862 43.4208 73.7306 42.7614 73.631C42.102 73.5314 41.5502 73.3141 41.1061 72.9791C40.662 72.644 40.3439 72.2156 40.1517 71.6939C39.9595 71.1722 39.9159 70.5821 40.021 69.9238C40.1261 69.2654 40.3521 68.7118 40.6992 68.2629C41.045 67.8224 41.4817 67.508 42.0093 67.3197C42.5369 67.1315 43.1304 67.0871 43.7898 67.1867ZM43.5979 68.3895C43.112 68.3161 42.6946 68.4259 42.3458 68.719C41.9955 69.0205 41.7672 69.5047 41.6608 70.1714C41.5531 70.8467 41.6204 71.3712 41.8629 71.7449C42.104 72.1271 42.4675 72.3549 42.9534 72.4282C43.4392 72.5016 43.8566 72.3918 44.2055 72.0987C44.553 71.8141 44.7806 71.3342 44.8884 70.6589C44.9948 69.9921 44.9281 69.4634 44.6884 69.0728C44.4473 68.6906 44.0838 68.4628 43.5979 68.3895Z" />
					<path d="M37.7924 65.6301C38.5144 65.8728 38.9823 66.2424 39.1961 66.739C39.3987 67.2409 39.3681 67.8632 39.1043 68.6059L36.8335 75L35.2774 74.477L37.5225 68.1556C37.7805 67.429 37.5942 66.9597 36.9635 66.7477C36.8722 66.717 36.7795 66.6904 36.6853 66.6678C36.5912 66.6452 36.4983 66.632 36.4067 66.6284L36.8574 65.4378C37.1819 65.4656 37.4936 65.5297 37.7924 65.6301Z" />
					<path d="M34.3502 64.0724C35.0335 64.4046 35.4479 64.8304 35.5933 65.3499C35.727 65.8732 35.6132 66.4863 35.2522 67.1892L32.1438 73.2407L30.6711 72.5248L33.7442 66.5421C34.0974 65.8545 33.9755 65.3655 33.3786 65.0754C33.2922 65.0334 33.2039 64.9952 33.1135 64.9608C33.0232 64.9265 32.9329 64.9017 32.8426 64.8864L33.449 63.7632C33.767 63.8319 34.0675 63.935 34.3502 64.0724Z" />
					<path d="M28.2904 69.5588L27.3934 70.8556L25.8636 69.8542L26.7607 68.5573L28.2904 69.5588ZM32.5706 63.1875L28.9751 68.3854L27.6092 67.4913L31.2048 62.2933L32.5706 63.1875Z" />
					<path d="M29.5982 61.2537L25.0442 65.6839L23.9081 64.5786L24.6158 63.8901C24.1999 63.9927 23.7932 63.9837 23.3959 63.8629C22.9923 63.736 22.626 63.5126 22.2969 63.1925C21.2229 62.1476 21.3098 61.0181 22.5577 59.8041L25.3329 57.1043L26.497 58.2368L23.7777 60.8822C23.4238 61.2265 23.2344 61.5436 23.2096 61.8335C23.1786 62.1174 23.3027 62.3952 23.5821 62.667C23.9236 62.9992 24.3054 63.1592 24.7276 63.1472C25.1374 63.1351 25.5192 62.9569 25.8731 62.6126L28.4341 60.1212L29.5982 61.2537Z" />
					<path d="M25.0464 52.1726C25.3463 52.6749 25.5678 53.1819 25.711 53.6937C25.8573 54.1938 25.9082 54.6787 25.8637 55.1484L24.6347 55.3094C24.6621 54.8791 24.6193 54.4587 24.5063 54.0484C24.4009 53.6338 24.2424 53.2493 24.0307 52.8948C23.4397 51.905 22.6545 51.6869 21.6751 52.2403L20.9121 52.6715C21.316 52.6507 21.7061 52.7513 22.0823 52.9733C22.4542 53.188 22.757 53.491 22.9907 53.8825C23.2818 54.3699 23.4215 54.859 23.4098 55.3496C23.3905 55.8445 23.2316 56.3097 22.9331 56.745C22.6346 57.1804 22.2082 57.5547 21.654 57.8679C21.0997 58.1811 20.5581 58.3538 20.029 58.386C19.4924 58.4226 19.0021 58.3242 18.5582 58.091C18.1068 57.8621 17.7355 57.5039 17.4445 57.0164C17.2019 56.6102 17.0807 56.1947 17.0809 55.7698C17.0735 55.3492 17.1813 54.9772 17.4044 54.6535L16.4933 55.1684L15.6863 53.8167L20.6973 50.9852C21.6008 50.4747 22.4192 50.3234 23.1526 50.5313C23.8859 50.7392 24.5172 51.2863 25.0464 52.1726ZM21.6839 54.1171C21.4281 53.6887 21.0734 53.4348 20.6197 53.3553C20.1661 53.2758 19.6774 53.384 19.1535 53.68C18.6296 53.976 18.2946 54.3333 18.1484 54.7517C17.9947 55.1744 18.0457 55.6 18.3015 56.0284C18.5572 56.4568 18.912 56.7107 19.3656 56.7903C19.8116 56.8741 20.2966 56.768 20.8205 56.4719C21.3444 56.1759 21.6832 55.8165 21.8369 55.3938C21.9907 54.9711 21.9397 54.5455 21.6839 54.1171Z" />
					<path d="M18.2229 44.4791C18.3035 44.8902 18.2783 45.2862 18.1474 45.667C18.0079 46.0494 17.7862 46.3775 17.4823 46.6512C17.1784 46.925 16.8109 47.1019 16.3797 47.1819C15.9829 47.2555 15.5931 47.2279 15.2103 47.0989C14.8172 46.9632 14.4791 46.7433 14.1961 46.4393C13.9044 46.1369 13.7157 45.7675 13.6302 45.3312C13.5512 44.9285 13.5772 44.5367 13.7081 44.1559C13.8374 43.7667 14.0583 43.4344 14.3708 43.1591C14.6747 42.8853 15.0465 42.7076 15.4864 42.626C15.909 42.5476 16.3134 42.5812 16.6995 42.727C17.084 42.8643 17.4134 43.0858 17.6879 43.3914C17.9623 43.697 18.1406 44.0595 18.2229 44.4791Z" />
					<path d="M18.6752 37.6156L9.5 36.2299L9.75862 34.6093L13.8191 35.2226L13.8232 35.1972L10.391 30.6465L10.7062 28.6714L14.4251 33.6804L19.9158 29.8419L19.5966 31.8423L14.6952 35.3289L14.6911 35.3543L18.9338 35.995L18.6752 37.6156Z" />
					<path d="M21.4122 27.3846C21.1308 28.0386 20.7629 28.5508 20.3084 28.9213C19.8539 29.2918 19.3399 29.5131 18.7664 29.5851C18.1962 29.6493 17.5953 29.5527 16.9635 29.2955C16.348 29.0448 15.8619 28.7034 15.5053 28.2712C15.1521 27.831 14.9392 27.3415 14.8665 26.8026C14.789 26.2526 14.8707 25.6978 15.1114 25.1384C15.4639 24.319 16.0092 23.7817 16.7472 23.5266C17.4885 23.2637 18.3209 23.3202 19.2442 23.6961L19.6937 23.8792L17.9139 28.0157C19.0224 28.3375 19.8072 27.9626 20.2682 26.891C20.4072 26.5679 20.4976 26.2251 20.5394 25.8625C20.5731 25.4965 20.5383 25.1351 20.4348 24.7782L21.6333 24.7801C21.7496 25.1515 21.7867 25.574 21.7447 26.0477C21.7027 26.5213 21.5919 26.967 21.4122 27.3846ZM16.1695 25.4998C15.983 25.9332 15.9698 26.3398 16.13 26.7199C16.2901 27.0999 16.5931 27.4131 17.0392 27.6596L18.2901 24.7521C17.7825 24.5825 17.3483 24.5631 16.9874 24.6939C16.6218 24.8136 16.3491 25.0822 16.1695 25.4998Z" />
					<path d="M24.7026 21.8379C24.2782 22.4143 23.802 22.8337 23.2739 23.0961C22.7459 23.3585 22.1941 23.4626 21.6185 23.4082C21.048 23.3469 20.4844 23.1223 19.9276 22.7343C19.3851 22.3563 18.9897 21.9179 18.7413 21.4191C18.4981 20.9134 18.4029 20.39 18.4557 19.8489C18.5064 19.2959 18.7133 18.7729 19.0764 18.2798C19.6081 17.5577 20.2629 17.1524 21.0408 17.0641C21.8238 16.9688 22.6222 17.2046 23.4359 17.7717L23.832 18.0477L21.1477 21.6933C22.1544 22.2477 23.0054 22.0527 23.7008 21.1083C23.9104 20.8236 24.0772 20.509 24.2012 20.1647C24.318 19.8153 24.367 19.4554 24.3481 19.085L25.5159 19.3472C25.544 19.7345 25.4832 20.1544 25.3335 20.607C25.1839 21.0596 24.9736 21.4699 24.7026 21.8379ZM20.0248 18.862C19.7436 19.2439 19.6374 19.6374 19.7062 20.0426C19.7751 20.4478 19.9986 20.819 20.3768 21.1561L22.2635 18.5938C21.8077 18.3182 21.3888 18.2049 21.007 18.2541C20.6232 18.2913 20.2958 18.4939 20.0248 18.862Z" />
					<path d="M28.3153 20.7233L22.5782 14.2178L23.7977 13.2L24.4666 13.9585C24.3779 13.5824 24.4049 13.1998 24.5475 12.8106C24.6969 12.4159 24.9515 12.0683 25.3113 11.768C25.7378 11.412 26.1996 11.2011 26.6967 11.1351C27.2005 11.0635 27.7053 11.1374 28.2111 11.3568C28.7111 11.5697 29.187 11.9322 29.6387 12.4443C30.0846 12.95 30.3834 13.4659 30.535 13.992C30.681 14.5117 30.6826 15.0055 30.54 15.4735C30.3974 15.9414 30.1095 16.3561 29.6763 16.7176C29.3298 17.0068 28.9537 17.1969 28.548 17.2879C28.1433 17.3668 27.759 17.3443 27.3952 17.2203L29.5648 19.6805L28.3153 20.7233ZM28.5118 16.0858C28.8849 15.7743 29.0705 15.3944 29.0684 14.946C29.0606 14.4911 28.8308 14.0076 28.3792 13.4955C27.9218 12.9768 27.4683 12.6857 27.0188 12.6219C26.5636 12.5517 26.1493 12.6723 25.7762 12.9838C25.403 13.2952 25.2174 13.6752 25.2195 14.1236C25.2159 14.5655 25.4428 15.0458 25.9002 15.5644C26.3518 16.0765 26.8081 16.371 27.2691 16.4477C27.7244 16.5179 28.1386 16.3973 28.5118 16.0858Z" />
					<path d="M37.3249 12.2641C36.8204 12.4631 36.3237 12.5899 35.8348 12.6445C35.3459 12.6991 34.9088 12.6733 34.5235 12.5672L34.5083 11.4395C34.8919 11.5187 35.2939 11.5398 35.7144 11.503C36.1315 11.4583 36.5273 11.3621 36.9016 11.2145C37.2922 11.0604 37.5546 10.8832 37.689 10.6827C37.8282 10.4711 37.8532 10.2584 37.7642 10.0447C37.6256 9.71225 37.2843 9.59801 36.7402 9.70201L35.4257 9.95782C34.3131 10.1754 33.5787 9.8568 33.2224 9.00191C33.064 8.62195 33.0329 8.25173 33.129 7.89123C33.2332 7.52753 33.4452 7.19506 33.7649 6.89382C34.0847 6.59258 34.4927 6.34407 34.9891 6.1483C35.4122 5.98141 35.8438 5.8803 36.2838 5.84499C36.7206 5.80176 37.1251 5.84036 37.4975 5.96079L37.4883 7.09811C37.1731 7.0012 36.8257 6.96313 36.4459 6.9839C36.0742 7.00145 35.7378 7.06961 35.4368 7.18835C35.0381 7.34562 34.7691 7.53004 34.6299 7.74164C34.4988 7.95002 34.4795 8.16503 34.5719 8.38667C34.717 8.73496 35.038 8.85722 35.5348 8.75344L36.8494 8.49762C37.4178 8.384 37.8891 8.40089 38.2632 8.54828C38.6454 8.69246 38.9256 8.97828 39.1038 9.40572C39.3446 9.98357 39.3024 10.5302 38.9772 11.0456C38.6486 11.5531 38.0979 11.9593 37.3249 12.2641Z" />
					<path d="M43.6012 10.5262C42.9371 10.6494 42.3337 10.6266 41.7911 10.4577C41.2469 10.2805 40.7934 9.97331 40.4306 9.53628C40.0678 9.09925 39.8222 8.55352 39.6939 7.89907C39.5656 7.24462 39.5891 6.65767 39.7643 6.1382C39.9379 5.61034 40.2458 5.17494 40.6881 4.83202C41.1287 4.4807 41.6811 4.24342 42.3452 4.1202C42.7506 4.04498 43.1639 4.03349 43.5854 4.08573C44.0068 4.13797 44.3691 4.25335 44.6722 4.43188L44.4082 5.61564C44.1461 5.46427 43.8629 5.36465 43.5586 5.31678C43.2628 5.2673 42.9856 5.26657 42.7269 5.31458C42.1662 5.41861 41.7644 5.67142 41.5214 6.07304C41.2853 6.46467 41.229 6.97512 41.3523 7.60439C41.4741 8.22527 41.7213 8.6881 42.0939 8.99287C42.4734 9.28765 42.9435 9.38304 43.5042 9.27901C43.7543 9.2326 44.0118 9.13265 44.2766 8.97915C44.5415 8.82566 44.7663 8.62742 44.9511 8.38445L45.6469 9.40315C45.431 9.66931 45.1334 9.90712 44.7544 10.1166C44.3823 10.3161 43.9979 10.4526 43.6012 10.5262Z" />
					<path d="M46.3914 10.0394L46.3168 3.77455L47.9235 3.75645L47.9366 4.85824C48.2438 4.11161 48.915 3.69403 49.9501 3.60549L50.4501 3.56141L50.5716 4.91825L49.6244 5.01861C48.5458 5.13327 48.0122 5.67744 48.0238 6.65111L48.0639 10.0205L46.3914 10.0394Z" />
					<path d="M53.9237 10.6344C53.2678 10.5152 52.7231 10.2815 52.2897 9.93342C51.8564 9.58531 51.5519 9.14765 51.3762 8.62044C51.2021 8.08483 51.178 7.48957 51.3037 6.83465C51.4295 6.17973 51.6721 5.63728 52.0315 5.20731C52.391 4.77733 52.8373 4.47611 53.3706 4.30364C53.904 4.13118 54.4986 4.10454 55.1545 4.22372C55.8105 4.34291 56.3552 4.57656 56.7885 4.92467C57.2219 5.27278 57.5264 5.71044 57.7021 6.23765C57.8777 6.76486 57.9027 7.35592 57.777 8.01084C57.6512 8.66576 57.4078 9.21241 57.0468 9.65078C56.6873 10.0808 56.2409 10.382 55.7076 10.5544C55.1743 10.7269 54.5797 10.7536 53.9237 10.6344ZM54.1534 9.43788C54.6368 9.5257 55.0574 9.42834 55.4154 9.14581C55.7749 8.85488 56.0184 8.37776 56.1457 7.71444C56.2747 7.04273 56.2239 6.51649 55.9933 6.13571C55.7643 5.74653 55.4082 5.50803 54.9248 5.42021C54.4415 5.33239 54.0209 5.42974 53.6629 5.71228C53.3066 5.98642 53.0639 6.45934 52.935 7.13105C52.8076 7.79436 52.8576 8.32481 53.085 8.72238C53.314 9.11156 53.6701 9.35006 54.1534 9.43788Z" />
					<path d="M59.844 12.3376C59.1298 12.074 58.6735 11.6908 58.4752 11.1882C58.2881 10.6806 58.3379 10.0595 58.6245 9.32478L61.0919 3L62.6311 3.56826L60.1918 9.82116C59.9114 10.5399 60.0831 11.0144 60.707 11.2448C60.7973 11.2781 60.8892 11.3074 60.9826 11.3328C61.076 11.3581 61.1684 11.374 61.2598 11.3803L60.7726 12.5571C60.449 12.5199 60.1395 12.4467 59.844 12.3376Z" />
					<path d="M63.2828 14.0001C62.6099 13.6484 62.2087 13.2108 62.0791 12.6873C61.9615 12.1604 62.0938 11.5509 62.4761 10.8586L65.7673 4.89931L67.2176 5.65729L63.9638 11.5489C63.5898 12.2261 63.6967 12.7183 64.2845 13.0255C64.3696 13.07 64.4567 13.1107 64.546 13.1476C64.6352 13.1846 64.7247 13.212 64.8146 13.2298L64.1743 14.3351C63.8584 14.2573 63.5613 14.1456 63.2828 14.0001Z" />
					<path d="M69.4967 8.6711L70.4324 7.40036L71.9313 8.4449L70.9957 9.71564L69.4967 8.6711ZM65.0267 14.9178L68.7771 9.82446L70.1154 10.7571L66.3651 15.8505L65.0267 14.9178Z" />
					<path d="M67.9718 16.9442L72.6562 12.6446L73.7589 13.7816L73.0308 14.4498C73.4497 14.3589 73.8559 14.3795 74.2495 14.5115C74.6491 14.6497 75.0085 14.8834 75.3279 15.2127C76.3703 16.2875 76.2497 17.414 74.966 18.5922L72.1113 21.2124L70.9815 20.0475L73.7788 17.4801C74.1428 17.1459 74.3415 16.8343 74.375 16.5453C74.4145 16.2624 74.2987 15.9812 74.0276 15.7016C73.6962 15.3599 73.3193 15.1891 72.8969 15.1892C72.487 15.1897 72.1 15.357 71.7359 15.6911L69.1016 18.1091L67.9718 16.9442Z" />
					<path d="M72.2291 26.0854C71.9427 25.5758 71.7347 25.0634 71.6052 24.5482C71.4722 24.0445 71.4342 23.5585 71.4911 23.0902L72.724 22.96C72.6852 23.3896 72.7168 23.8108 72.8189 24.2238C72.9132 24.6409 73.0615 25.0293 73.2637 25.389C73.8282 26.3933 74.6073 26.6311 75.6011 26.1024L76.3753 25.6906C75.971 25.7012 75.5837 25.5908 75.2135 25.3594C74.8475 25.1355 74.5528 24.825 74.3296 24.4278C74.0515 23.9332 73.9248 23.4408 73.9495 22.9506C73.9819 22.4563 74.1531 21.9953 74.4631 21.5676C74.7731 21.1399 75.2092 20.7764 75.7716 20.4773C76.334 20.1781 76.88 20.019 77.4098 20.0001C77.9472 19.977 78.4347 20.0877 78.8722 20.3319C79.3174 20.5721 79.6791 20.9395 79.9571 21.4341C80.1888 21.8463 80.2989 22.2648 80.2875 22.6895C80.2837 23.1101 80.166 23.4794 79.9344 23.7973L80.8589 23.3055L81.6298 24.6769L76.5453 27.3817C75.6286 27.8693 74.8064 28.0001 74.0788 27.7738C73.3512 27.5475 72.7346 26.9848 72.2291 26.0854ZM75.6422 24.226C75.8865 24.6607 76.2344 24.9235 76.6857 25.0143C77.1371 25.1052 77.6286 25.0093 78.1601 24.7265C78.6917 24.4438 79.0361 24.0951 79.1933 23.6804C79.3582 23.2617 79.3185 22.835 79.0742 22.4003C78.8298 21.9657 78.482 21.7029 78.0306 21.612C77.5869 21.517 77.0993 21.6109 76.5678 21.8937C76.0362 22.1764 75.688 22.5272 75.5231 22.9459C75.3581 23.3647 75.3978 23.7914 75.6422 24.226Z" />
					<path d="M78.8577 33.9617C78.7884 33.5486 78.8244 33.1534 78.9658 32.7762C79.1158 32.3975 79.3465 32.0753 79.6578 31.8096C79.9691 31.5438 80.3414 31.3765 80.7747 31.3078C81.1733 31.2445 81.5622 31.2824 81.9413 31.4213C82.3305 31.5672 82.6624 31.7958 82.937 32.1071C83.2203 32.417 83.3987 32.7911 83.4722 33.2295C83.54 33.6341 83.5033 34.0251 83.3619 34.4023C83.2219 34.788 82.992 35.1144 82.672 35.3816C82.3607 35.6473 81.9841 35.8153 81.5422 35.8854C81.1175 35.9528 80.7142 35.9086 80.3323 35.7528C79.9517 35.6055 79.6285 35.3755 79.3626 35.0629C79.0966 34.7502 78.9283 34.3832 78.8577 33.9617Z" />
				</motion.g>
			</svg>
		</button>
	)
}
